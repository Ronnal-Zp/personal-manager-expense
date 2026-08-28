import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { Transaction } from '../../shared/models/transaction';
import { CATEGORIES, CategoryEnum, CategoryExpense, CategoryExpenseTotal } from '../../shared/models';
import { BudgetService } from '../../shared/services/budget.service';
import { ExpenseService } from '../../shared/services/expense.service';
import Swal from 'sweetalert2';

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
  public readonly formattedBudget = computed(() => `$${this.budgetService.monthlyBudget().toFixed(2)}`);
  public transactions = signal<Transaction[]>([]);
  public totalByCategory = signal<CategoryExpenseTotal[]>([]);
  public categories = signal<CategoryExpense[]>(CATEGORIES)
  public totalExpense = 0;
  public available = 0;

  constructor(
    private readonly expenseService: ExpenseService
  ){}

  async ngOnInit() {
    try {
        this.totalByCategory.set( await this.expenseService.getTotalByCategory() );
        this.transactions.set( await this.expenseService.getAll() );
        this.totalExpense = this.totalByCategory().reduce((acum, categ) => acum + categ.total, 0);
        this.available = this.budgetService.monthlyBudget() - this.totalExpense;
    } catch (error: any) {
       Swal.fire({
        title: '¡Ha ocurrido un error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  getCurrentExpensesByCategory(idCategory: number) {
    return this.totalByCategory().find(c => c.categoryId == idCategory)?.total ?? 0;
  }

}
