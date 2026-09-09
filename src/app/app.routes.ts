import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page').then(m => m.LoginPage),
    },
    {
        path: '',
        component: Dashboard,
        canActivate: [authGuard],
        children: [
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
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full',
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio',
    }
];
