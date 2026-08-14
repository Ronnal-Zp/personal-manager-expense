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
        path: '**',
        redirectTo: 'inicio',
    }
];
