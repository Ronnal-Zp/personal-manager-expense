import { Component } from '@angular/core';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { FilterChip } from '../../shared/components/filter-chip/filter-chip';
import { Transaction } from '../../shared/models/transaction';

@Component({
  selector: 'app-expenses-list-page',
  imports: [RecentTransactions, FilterChip],
  templateUrl: './expenses-list-page.html',
  styleUrl: './expenses-list-page.css',
  host: { class: 'w-full'}
})
export class ExpensesListPage {

  filters = [
    { label: 'Todas' },
    { label: 'Comida' },
    { label: 'Transporte' },
  ];

  selectedFilter = 'Todas';

  transactions: Transaction[] = [
    { title: 'Uber al trabajo', category: 'Transporte', date: '08 ago', colorClass: 'bg-red-400', amount: 15.00, sumRestSign: '-' },
    { title: 'Supermercado La Vega', category: 'Comida', date: '08 ago', colorClass: 'bg-orange-400', amount: 50.00, sumRestSign: '+' },
  ];

}
