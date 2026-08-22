import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const DATE_PATTERN = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

@Component({
  selector: 'app-expenses-add-page',
  imports: [ReactiveFormsModule],
  templateUrl: './expenses-add-page.html',
  styleUrl: './expenses-add-page.css',
})
export class ExpensesAddPage implements OnInit {

  private formBuilder = inject(FormBuilder);

  formExpense!: FormGroup

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
      date: [this.toDisplayDate(this.today()), [Validators.required, Validators.pattern(DATE_PATTERN)]]
    })
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

}
