import { Component, computed, effect, input } from '@angular/core';
import { CATEGORIES } from '../../models/categoryExpense';

type sumRestSign = '+' | '-';

@Component({
  selector: 'app-transaction-item',
  imports: [],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.css',
})
export class TransactionItem {
  description = input.required<string>();
  categoryId = input.required<number>();
  date = input.required<string>();
  amount = input.required<number>();
  sumRestSign = input<sumRestSign>('+');
  colorClass = input<string>('bg-gray-500');
  showDivider = input(false);

  category = computed(() => CATEGORIES.find((category) => category.id == this.categoryId()));

  categoryName = computed(() => this.category()?.name ?? this.categoryId());

  categoryColorClass = computed(() => this.category()?.color ?? this.colorClass());

}
