import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../shared/services/expense.service';
import Swal from 'sweetalert2'
import { CategoryService } from '../../shared/services/category.service';
import { CategoryResponseI } from '../../shared/models/category/CategoryResponse';
import { ExpenseCreateRequest } from '../../shared/models/expense/ExpenseRequest';

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
  private expenseService = inject(ExpenseService);
  private categoryService = inject(CategoryService);

  formExpense!: FormGroup
  categories = signal<CategoryResponseI[]>([]);
  @ViewChild('dateCalendar') dateCalendarInput!: ElementRef<HTMLInputElement>;


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
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      category_id: ['', [Validators.required]],
      date: [this.toDisplayDate(this.today()), [Validators.required, Validators.pattern(DATE_PATTERN)]],
      sum_rest_sign: ['-']//TODO: agregar combobox que permita seleccionar gasto/ingreso
    })

    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories.set(response.data);
      },
      error: (err: any) => {
         Swal.fire({
          title: '¡Ha ocurrido un error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  selectCategory(category_id: string): void {
    this.formExpense.get('category_id')?.setValue(category_id);
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

  onCategorySelected(category: CategoryResponseI): void {
    this.formExpense.get('category_id')?.setValue(category.id);
  }

  private parseDisplayDate(value: string): Date {
    const [day, month, year] = value.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  async onGuardarGasto(): Promise<void> {
    const payload: ExpenseCreateRequest = {
      ...this.formExpense.value,
      date: this.toInputDate(this.parseDisplayDate(this.formExpense.get('date')?.value))
    }
    
    this.expenseService.add(payload).subscribe({
      next: (data) => {
        Swal.fire({
          title: '¡Operación exitosa!',
          text: 'El registro ha sido guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.formExpense.reset()
        this.formExpense.get('amount')?.setValue('0');
        this.formExpense.get('date')?.setValue(this.toDisplayDate(this.today()));
      },
      error: (err: any) => {
        Swal.fire({
          title: '¡Ha ocurrido un error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al guardar el gasto', err)
      }
    });
  }

}
