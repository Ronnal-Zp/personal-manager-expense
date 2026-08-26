import { Component, effect, input } from '@angular/core';
import { TransactionItem } from '../transaction-item/transaction-item';
import { Transaction } from '../../models/transaction';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recent-transactions',
  imports: [TransactionItem, JsonPipe],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactions {
  transactions = input.required<Transaction[]>();

  constructor() {
    effect(() => console.log('this.transactions', this.transactions()));
  }
}
