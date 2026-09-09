import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { CATEGORIES, CategoryExpense, CategoryExpenseTotal } from '../../shared/models';
import { BudgetService } from '../../shared/services/budget.service';
import { ExpenseService } from '../../shared/services/expense.service';
import { ExpenseItemResponse } from '../../shared/models/expense/ExpenseResponse';

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
  private readonly expenseService = inject(ExpenseService);
  public readonly formattedBudget = computed(() => `$${this.budgetService.monthlyBudget().toFixed(2)}`);
  public transactions = signal<ExpenseItemResponse[]>([]);
  public totalByCategory = signal<CategoryExpenseTotal[]>([]);
  public categories = signal<CategoryExpense[]>(CATEGORIES)
  public totalExpense = 0;
  public available = 0;


  ngOnInit() {
    forkJoin({
      totalByCategory: this.expenseService.getTotalByCategory(),
      expenses: this.expenseService.getAll({ page: 1, limit: 255 })
    }).subscribe({
      next: ({ totalByCategory, expenses }) => {
        this.totalByCategory.set(totalByCategory.data);
        this.totalExpense = this.totalByCategory().reduce((acum, categ) => acum + categ.total, 0);
        this.available = this.budgetService.monthlyBudget() - this.totalExpense;

        this.transactions.set(
          expenses.data.map(i => ({ ...i, date: i.date.toString().split('T')[0] }))
        );
      },
      error: (err) => {
        Swal.fire({
          title: '¡Ha ocurrido un error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  getCurrentExpensesByCategory(idCategory: number) {
    return this.totalByCategory().find(c => c.categoryId == idCategory)?.total ?? 0;
  }

}
