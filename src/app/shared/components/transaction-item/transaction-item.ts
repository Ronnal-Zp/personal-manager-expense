import { Component, computed, effect, input } from '@angular/core';
import { CATEGORIES } from '../../models/categoryExpense';
import { CategoryResponse } from '../../models/expense/ExpenseResponse';


@Component({
  selector: 'app-transaction-item',
  imports: [],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.css',
})
export class TransactionItem {
  description = input.required<string>();
  date = input.required<Date | string>();
  amount = input.required<number>();
  sumRestSign = input<string>('+');
  showDivider = input(false);
  
  category =  input.required<CategoryResponse>()
  categoryName = computed(() => this.category()?.name);
  categoryColorClass = computed(() => this.category().color);

}
