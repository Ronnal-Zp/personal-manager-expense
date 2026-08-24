import { Component } from '@angular/core';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { Transaction } from '../../shared/models/transaction';
import { CategoryEnum } from '../../shared/models';

@Component({
  selector: 'app-init-page',
  imports: [SummaryCard, CategoryProgress, RecentTransactions],
  templateUrl: './init-page.html',
  styleUrl: './init-page.css',
  host: {
    class: 'w-full'
  }
})
export class InitPage {
  transactions: Transaction[] = [
    { id: 1, title: 'Uber al trabajo', categoryId: CategoryEnum.TRANSPORTE, date: '08 ago', colorClass: 'bg-red-400', amount: 15.00, sumRestSign: '-' },
    { id: 2, title: 'Supermercado La Vega', categoryId: CategoryEnum.COMIDA, date: '08 ago', colorClass: 'bg-orange-400', amount: 50.00, sumRestSign: '+' },
  ];
}
