import { Component, input } from '@angular/core';
import { TransactionItem } from '../transaction-item/transaction-item';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-recent-transactions',
  imports: [TransactionItem],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css',
})
export class RecentTransactions {
  transactions = input.required<Transaction[]>();
}
