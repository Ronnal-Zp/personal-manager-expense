import { Component } from '@angular/core';
import { RecentTransactions } from '../../shared/components/recent-transactions/recent-transactions';
import { FilterChip } from '../../shared/components/filter-chip/filter-chip';
import { Transaction } from '../../shared/models/transaction';
import { CategoryEnum } from '../../shared/models';

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
    { id: 1, title: 'Uber al trabajo', categoryId: CategoryEnum.TRANSPORTE, date: '08 ago', colorClass: 'bg-red-400', amount: 15.00, sumRestSign: '-' },
    { id: 2, title: 'Supermercado La Vega', categoryId: CategoryEnum.COMIDA, date: '08 ago', colorClass: 'bg-orange-400', amount: 50.00, sumRestSign: '+' },
  ];

}
