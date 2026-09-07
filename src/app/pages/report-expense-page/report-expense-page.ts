import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ExpenseService } from '../../shared/services/expense.service';
import { CATEGORIES, CategoryExpense, CategoryExpenseTotal, Transaction } from '../../shared/models';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';

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
  private readonly chartCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart?: Chart;
  public totalByCategory = signal<CategoryExpenseTotal[]>([]);
  public categories = signal<CategoryExpense[]>(CATEGORIES)
  public transactions = signal<Transaction[]>([]);

  async ngAfterViewInit() {
    this.totalByCategory.set( await this.expenseService.getTotalByCategory() );
    // this.transactions.set( await this.expenseService.getAll() );

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const labels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1));

    const datasets = CATEGORIES.map((category) => {
      const dataByDay = new Array(daysInMonth).fill(0);

      this.transactions()
        .filter((transaction) => transaction.categoryId == category.id)
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

  private parseDate(value: string): Date {
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  private resolveHexColor(colorClass: string): string {
    const map: Record<string, string> = {
      'bg-red-400': '#f87171',
      'bg-blue-400': '#60a5fa',
      'bg-emerald-400': '#34d399',
      'bg-purple-400': '#c084fc',
      'bg-pink-400': '#f472b6',
      'bg-gray-400': '#9ca3af',
    };
    return map[colorClass] ?? '#9ca3af';
  }

  getCurrentExpensesByCategory(idCategory: number) {
    return this.totalByCategory().find(c => c.categoryId == idCategory)?.total ?? 0;
  }
}
