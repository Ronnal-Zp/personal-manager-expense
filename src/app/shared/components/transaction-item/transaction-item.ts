import { Component, input } from '@angular/core';

type sumRestSign = '+' | '-';

@Component({
  selector: 'app-transaction-item',
  imports: [],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.css',
})
export class TransactionItem {
  title = input.required<string>();
  category = input.required<string>();
  date = input.required<string>();
  amount = input.required<number>();
  sumRestSign = input<sumRestSign>('+');
  colorClass = input<string>('bg-gray-500');
  showDivider = input(false);
}
