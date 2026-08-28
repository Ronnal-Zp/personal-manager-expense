import { ExpenseService } from './../../shared/services/expense.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
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

  private readonly expenseService = inject(ExpenseService);

  filters = [
    { label: 'Todas' },
    ...CATEGORIES.map((category) => ({ label: category.name })),
  ];

  selectedFilter = signal('Todas');
  transactions = signal<Transaction[]>([]);

  filteredTransactions = computed(() => {
    const filter = this.selectedFilter();
    const all = this.transactions();

    if (filter === 'Todas') {
      return all;
    }

    const category = CATEGORIES.find((item) => item.name === filter);
    if (!category) {
      return all;
    }

    return all.filter(
      (transaction) => transaction.categoryId == category.id,
    );
  });

  async ngOnInit() {
    const expenses = await this.expenseService.getAll();
    this.transactions.set(expenses.map((expense) => ({
      ...expense,
      colorClass: this.resolveCategoryColor(expense.categoryId),
    })));
  }

  selectFilter(label: string): void {
    this.selectedFilter.set(label);
  }

  private resolveCategoryColor(categoryId: number): string {
    const category = CATEGORIES.find((item) => item.id === categoryId);
    return category?.color ?? 'bg-gray-500';
  }

}
