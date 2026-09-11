import { Component, effect, input } from '@angular/core';
import { TransactionItem } from '../transaction-item/transaction-item';
import { ExpenseItemResponse } from '../../models/expense/ExpenseResponse';

@Component({
  selector: 'app-recent-transactions',
  imports: [TransactionItem],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactions {
  transactions = input.required<ExpenseItemResponse[]>();
  emptyMessage = input('');

  constructor() {
    effect(() => console.log('this.transactions', this.transactions()));
  }
}
