import { ExpenseService } from './../../shared/services/expense.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of, Subject, switchMap } from 'rxjs';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { FilterChip } from '../../shared/components/filter-chip/filter-chip';
import { ExpenseItemResponse } from '../../shared/models/expense/ExpenseResponse';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryResponseI } from '../../shared/models/category/CategoryResponse';
import { PageQuery } from '../../shared/models/PageQuery';

const ALL_FILTER_ID = 0;
const PAGE_QUERY: PageQuery = { page: 1, limit: 10 };

@Component({
  selector: 'app-expenses-list-page',
  imports: [RecentTransactions, FilterChip],
  templateUrl: './expenses-list-page.html',
  styleUrl: './expenses-list-page.css',
  host: { class: 'w-full'}
})
export class ExpensesListPage implements OnInit {

  private readonly expenseService = inject(ExpenseService);
  private readonly categoryService = inject(CategoryService);

  private readonly categorySelected = new Subject<number>();

  readonly allFilterId = ALL_FILTER_ID;

  filters = signal<CategoryResponseI[]>([]);
  selectedFilterId = signal(ALL_FILTER_ID);
  expenses = signal<ExpenseItemResponse[]>([]);
  loading = signal(false);

  constructor() {
    this.categorySelected
      .pipe(
        switchMap((categoryId) => {
          const request$ = categoryId === ALL_FILTER_ID
            ? this.expenseService.getAll(PAGE_QUERY)
            : this.expenseService.getAllByCategory(categoryId, PAGE_QUERY);

          return request$.pipe(
            catchError((err) => {
              console.log(err);
              return of<ExpenseItemResponse[]>([]);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((response) => {
        const data = Array.isArray(response) ? response : response.data;

        this.expenses.set(
          data.map(i => ({ ...i, date: i.date.toString().split('T')[0]}))
        );
        this.loading.set(false);
      });
  }

  ngOnInit() {

    this.selectFilter(ALL_FILTER_ID);

    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.filters.set(response.data);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  selectFilter(categoryId: number): void {
    this.selectedFilterId.set(categoryId);
    this.loading.set(true);
    this.categorySelected.next(categoryId);
  }

}
