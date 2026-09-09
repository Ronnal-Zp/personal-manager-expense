import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import Swal from 'sweetalert2';
import { ExpenseService } from '../../shared/services/expense.service';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryExpenseTotal } from '../../shared/models';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';
import { forkJoin } from 'rxjs';
import { ExpenseItemResponse } from '../../shared/models/expense/ExpenseResponse';
import { CategoryResponseI } from '../../shared/models/category/CategoryResponse';

@Component({
  selector: 'app-report-expense-page',
  imports: [CategoryProgress],
  templateUrl: './report-expense-page.html',
  styleUrl: './report-expense-page.css',
  host: {
    'class': 'w-full px-4'
  }
})
export class ReportExpensePage implements AfterViewInit, OnDestroy {
  private readonly expenseService = inject(ExpenseService);
  private readonly categoryService = inject(CategoryService);
  private readonly chartCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart?: Chart;
  public totalByCategory = signal<CategoryExpenseTotal[]>([]);
  public categories = signal<CategoryResponseI[]>([])
  public transactions = signal<ExpenseItemResponse[]>([]);

  ngAfterViewInit() {
    forkJoin({
      totalByCategory: this.expenseService.getTotalByCategory(),
      expenses: this.expenseService.getAll({ page: 1, limit: 255 }),
      categories: this.categoryService.getAll(),
    }).subscribe({
      next: ({ totalByCategory, expenses, categories }) => {
        this.totalByCategory.set(totalByCategory.data);

        this.categories.set(categories.data);

        this.transactions.set(
          expenses.data.map(i => ({ ...i, date: i.date.toString().split('T')[0] }))
        );

        this.setupReport();
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

  setupReport() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1));

    const datasets = this.categories().map((category) => {
      const dataByDay = new Array(daysInMonth).fill(0);

      this.transactions()
        .filter((transaction) => transaction.category.id == category.id)
        .forEach((transaction) => {
          const date = this.parseDate(transaction.date);

          if (date.getFullYear() == year && date.getMonth() == month) {
            const day = date.getDate() - 1;
            dataByDay[day] += transaction.amount;
          }
        });

      return {
        label: category.name,
        data: dataByDay,
        borderColor: this.resolveHexColor(category.color),
        backgroundColor: this.resolveHexColor(category.color),
        tension: 0.3,
        fill: false,
      };
    });

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          y: { beginAtZero: true },
        },
      },
    };

    this.chart = new Chart(this.chartCanvas().nativeElement, config);
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

  private parseDate(value: string | Date): Date {
    if (value instanceof Date) return value;
    const [year, month, day] = value.split('T')[0].split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private resolveHexColor(colorClass: string | null): string {
    const map: Record<string, string> = {
      'bg-red-400': '#f87171',
      'bg-blue-400': '#60a5fa',
      'bg-emerald-400': '#34d399',
      'bg-purple-400': '#c084fc',
      'bg-pink-400': '#f472b6',
      'bg-gray-400': '#9ca3af',
    };
    return (colorClass && map[colorClass]) ?? '#9ca3af';
  }

  getCurrentExpensesByCategory(idCategory: number) {
    return this.totalByCategory().find(c => c.categoryId == idCategory)?.total ?? 0;
  }
}
