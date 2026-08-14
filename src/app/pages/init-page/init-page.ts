import { Component } from '@angular/core';
import { SummaryCard } from '../../shared/components/summary-card/summary-card';
import { CategoryProgress } from '../../shared/components/category-progress/category-progress';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { Transaction } from '../../shared/models/transaction';

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
    { title: 'Uber al trabajo', category: 'Transporte', date: '08 ago', colorClass: 'bg-red-400', amount: 15.00, sumRestSign: '-' },
    { title: 'Supermercado La Vega', category: 'Comida', date: '08 ago', colorClass: 'bg-orange-400', amount: 50.00, sumRestSign: '+' },
  ];
}
