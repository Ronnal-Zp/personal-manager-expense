import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoryResponseI } from '../../shared/models/category/CategoryResponse';
import { TotalExpenseByCategory } from '../../shared/models/expense/ExpenseResponse';
import { CategoryService } from '../../shared/services/category.service';
import { ExpenseService } from '../../shared/services/expense.service';
import {
  CATEGORY_ICONS,
  CATEGORY_PALETTES,
  CategoryPalette,
  DEFAULT_ICON_ID,
  DEFAULT_PALETTE,
  iconClassOf,
  paletteOf,
} from '../../shared/constants/category-style';

interface CategoryRow extends CategoryResponseI {
  iconClass:  string;
  softClass:  string;
  textClass:  string;
  solidClass: string;
  spent:      number;
  usageLabel: string;
  overBudget: boolean;
}

@Component({
  selector: 'app-categories-page',
  imports: [ReactiveFormsModule],
  templateUrl: './categories-page.html',
  host: { class: 'block w-full' },
})
export class CategoriesPage implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly expenseService = inject(ExpenseService);

  readonly icons = CATEGORY_ICONS;
  readonly palettes = CATEGORY_PALETTES;

  readonly categories = signal<CategoryResponseI[]>([]);
  readonly totals = signal<TotalExpenseByCategory[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly selectedIcon = signal(DEFAULT_ICON_ID);
  readonly selectedPalette = signal<CategoryPalette>(DEFAULT_PALETTE);

  readonly formCategory = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    budget_Limit: [0, [Validators.required, Validators.min(1)]],
  });

  readonly rows = computed<CategoryRow[]>(() =>
    this.categories().map((category) => {
      const total = this.totals().find(t => t.categoryId === category.id);
      const spent = total?.total ?? 0;
      const palette = paletteOf(category.color);

      return {
        ...category,
        iconClass: iconClassOf(category.icon),
        softClass: palette.soft,
        textClass: category.text_color ?? palette.text,
        solidClass: palette.solid,
        spent,
        usageLabel: `${this.formatAmount(spent)} usados`,
        overBudget: category.budget_Limit > 0 && spent > category.budget_Limit,
      };
    })
  );

  readonly totalBudget = computed(() =>
    this.categories().reduce((acum, category) => acum + category.budget_Limit, 0)
  );

  readonly isEditing = computed(() => this.editingId() !== null);

  readonly previewIconClass = computed(() => iconClassOf(this.selectedIcon()));

  /** Getters (no `computed`): el valor del formulario reactivo no es una señal. */
  get previewName(): string {
    return this.formCategory.getRawValue().name.trim() || 'Nueva categoría';
  }

  get previewBudget(): string {
    return this.formatAmount(Number(this.formCategory.getRawValue().budget_Limit) || 0);
  }

  ngOnInit(): void {
    this.loadData();
  }

  formatAmount(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  usagePercentage(row: CategoryRow): number {
    if (row.budget_Limit <= 0) {
      return 0;
    }
    return Math.min(100, (row.spent / row.budget_Limit) * 100);
  }

  selectIcon(iconId: string): void {
    this.selectedIcon.set(iconId);
  }

  selectPalette(palette: CategoryPalette): void {
    this.selectedPalette.set(palette);
  }

  startEdit(row: CategoryRow): void {
    this.editingId.set(row.id);
    this.formCategory.setValue({ name: row.name, budget_Limit: row.budget_Limit });
    this.selectedIcon.set(this.icons.find(i => i.id === row.icon)?.id ?? DEFAULT_ICON_ID);
    this.selectedPalette.set(paletteOf(row.color));
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.formCategory.reset({ name: '', budget_Limit: 0 });
    this.selectedIcon.set(DEFAULT_ICON_ID);
    this.selectedPalette.set(DEFAULT_PALETTE);
  }

  onSave(): void {
    if (this.formCategory.invalid || this.saving()) {
      this.formCategory.markAllAsTouched();
      return;
    }

    const { name, budget_Limit } = this.formCategory.getRawValue();
    const palette = this.selectedPalette();
    const payload = {
      name: name.trim(),
      budget_Limit,
      icon: this.selectedIcon(),
      color: palette.solid,
      text_color: palette.text,
    };

    const editingId = this.editingId();
    const request$ = editingId === null
      ? this.categoryService.add(payload)
      : this.categoryService.update(editingId, payload);

    this.saving.set(true);
    request$.subscribe({
      next: () => {
        this.saving.set(false);
        Swal.fire({
          title: '¡Operación exitosa!',
          text: editingId === null
            ? 'La categoría ha sido creada correctamente.'
            : 'La categoría ha sido actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.cancelEdit();
        this.loadData();
      },
      error: (err: unknown) => {
        this.saving.set(false);
        this.showError(err);
      },
    });
  }

  async onDelete(row: CategoryRow): Promise<void> {
    const confirmation = await Swal.fire({
      title: `¿Eliminar "${row.name}"?`,
      text: row.spent > 0
        ? 'Esta categoría tiene gastos registrados y la operación no se puede deshacer.'
        : 'Esta operación no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    this.categoryService.delete(row.id).subscribe({
      next: () => {
        if (this.editingId() === row.id) {
          this.cancelEdit();
        }
        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'La categoría ha sido eliminada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.loadData();
      },
      error: (err: unknown) => this.showError(err),
    });
  }

  private loadData(): void {
    this.loading.set(true);
    forkJoin({
      categories: this.categoryService.getAll(),
      totals: this.expenseService.getTotalByCategory(),
    }).subscribe({
      next: ({ categories, totals }) => {
        this.categories.set(categories.data);
        this.totals.set(totals.data);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.loading.set(false);
        this.showError(err);
      },
    });
  }

  private showError(err: unknown): void {
    const text = err instanceof Error ? err.message : 'Intenta nuevamente en unos momentos.';
    Swal.fire({
      title: '¡Ha ocurrido un error!',
      text,
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
    console.error('Error en el mantenimiento de categorías', err);
  }

}
