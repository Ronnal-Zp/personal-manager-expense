import { Component, input } from '@angular/core';

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
  colorClass = input.required<string>();
  showDivider = input(false);
}
