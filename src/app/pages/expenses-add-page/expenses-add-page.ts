import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIES, CategoryExpense } from '../../shared/models/categoryExpense';
import { ExpenseService } from '../../shared/services/expense.service';
import { Transaction } from '../../shared/models';
import Swal from 'sweetalert2'

const DATE_PATTERN = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

@Component({
  selector: 'app-expenses-add-page',
  imports: [ReactiveFormsModule],
  templateUrl: './expenses-add-page.html',
  styleUrl: './expenses-add-page.css',
  host: { class: 'block w-full' },
})
export class ExpensesAddPage implements OnInit {

  private formBuilder = inject(FormBuilder);
  formExpense!: FormGroup
  categories = CATEGORIES;
  @ViewChild('dateCalendar') dateCalendarInput!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly expenseService: ExpenseService
  ){}

  categories = ['Comida', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Otros'];

  private today(): Date {
    return new Date();
  }

  private toDisplayDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private toInputDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.formExpense = this.formBuilder.group({
      amount: ['0', [Validators.required, Validators.min(1), Validators.max(999)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      category: ['', [Validators.required]],
      date: [this.toDisplayDate(this.today()), [Validators.required, Validators.pattern(DATE_PATTERN)]]
    })
  }

  selectCategory(category: string): void {
    this.formExpense.get('category')?.setValue(category);
  }

  get todayInputDate(): string {
    return this.toInputDate(this.today());
  }

  onCalendarDateSelected(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      return;
    }
    const [year, month, day] = value.split('-');
    this.formExpense.get('date')?.setValue(`${day}/${month}/${year}`);
  }

  openDatePicker(): void {
    const input = this.dateCalendarInput.nativeElement;
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.click();
    }
  }

  onCategorySelected(category: CategoryExpense): void {
    this.formExpense.get('category')?.setValue(category.id);
  }

  async onGuardarGasto(): Promise<void> {
    const payload: Transaction = {
      ...this.formExpense.value,
      id: Date.now(),
      categoryId: this.formExpense.get('category')?.value
    }
    try {
      await this.expenseService.add(payload)
      this.formExpense.reset()

      Swal.fire({
        title: '¡Operación exitosa!',
        text: 'El registro ha sido guardado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error: any) {
      Swal.fire({
        title: '¡Ha ocurrido un error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      console.error('Error al guardar el gasto', error)
    }
  }

}
