import { ExpenseService } from './../../shared/services/expense.service';
import { Component, OnInit, signal } from '@angular/core';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { FilterChip } from '../../shared/components/filter-chip/filter-chip';
import { Transaction } from '../../shared/models/transaction';
import { CATEGORIES } from '../../shared/models';

@Component({
  selector: 'app-expenses-list-page',
  imports: [RecentTransactions, FilterChip],
  templateUrl: './expenses-list-page.html',
  styleUrl: './expenses-list-page.css',
  host: { class: 'w-full'}
})
export class ExpensesListPage implements OnInit {

  constructor(
    private readonly expenseService: ExpenseService
  ) {}

  async ngOnInit() {
    const expenses = await this.expenseService.getAll();
    this.transactions.set(expenses.map((expense) => ({
      ...expense,
      colorClass: CATEGORIES.find((category) => category.name === expense.categoryId)?.color ?? 'bg-gray-500',
    })));
  }

  filters = [
    { label: 'Todas' },
    ...CATEGORIES.map((category) => ({ label: category.name })),
  ];

  selectedFilter = 'Todas';

  transactions = signal<Transaction[]>([]);

}
