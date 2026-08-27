import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { Transaction } from '../../shared/models/transaction';
import { CategoryEnum, CategoryExpenseTotal } from '../../shared/models';
import { BudgetService } from '../../shared/services/budget.service';
import { ExpenseService } from '../../shared/services/expense.service';

@Component({
  selector: 'app-init-page',
  imports: [SummaryCard, CategoryProgress, RecentTransactions],
  templateUrl: './init-page.html',
  styleUrl: './init-page.css',
  host: {
    class: 'w-full'
  }
})
export class InitPage implements OnInit {
  private readonly budgetService = inject(BudgetService);
  protected readonly formattedBudget = computed(() => `$${this.budgetService.monthlyBudget().toFixed(2)}`);
  public transactions = signal<Transaction[]>([]);
  public totalByCategory: CategoryExpenseTotal[] = [];

  constructor(
    private readonly expenseService: ExpenseService
  ){}

  async ngOnInit() {
    this.totalByCategory = await this.expenseService.getTotalByCategory();
    this.transactions.set( await this.expenseService.getAll() )


  }

}
