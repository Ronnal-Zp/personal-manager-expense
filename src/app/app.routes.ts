import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'inicio',
        loadComponent: () => import('./pages/init-page/init-page').then(m => m.InitPage),
    },
    {
        path: '**',
        redirectTo: 'inicio',
    }
];
