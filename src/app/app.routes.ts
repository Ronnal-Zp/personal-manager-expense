import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'inicio',
        loadComponent: () => import('./pages/init-page/init-page').then(m => m.InitPage),
    },
    {
        path: 'gastos',
        loadComponent: () => import('./pages/expenses-list-page/expenses-list-page').then(m => m.ExpensesListPage)
    },
    {
        path: 'agregar-gasto',
        loadComponent: () => import('./pages/expenses-add-page/expenses-add-page').then(m => m.ExpensesAddPage)
    },
    {
        path: 'reportes',
        loadComponent: () => import('./pages/report-expense-page/report-expense-page').then(m => m.ReportExpensePage)
    },
    {
        path: '**',
        redirectTo: 'inicio',
    }
];
