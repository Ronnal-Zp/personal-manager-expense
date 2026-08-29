import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BudgetService } from '../shared/services/budget.service';

interface NavItem {
  id: 'inicio' | 'gastos' | 'agregar' | 'reportes';
  path: string;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [RouterModule],
})
export class Dashboard {
  protected readonly budgetService = inject(BudgetService);
  protected readonly sidebarOpen = signal(false);
  protected readonly activeSection = signal<NavItem['id']>('inicio');
  protected readonly descriptionSection = signal<NavItem['description']>('Tu actividad de agosto 2026');

  protected readonly navItems: NavItem[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      path: '/inicio',
      icon: 'M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.69ZM12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z',
      description: 'Tu actividad de agosto 2026'
    },
    {
      id: 'gastos',
      label: 'Gastos',
      path: '/gastos',
      icon: 'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.625c.621 0 1.125.504 1.125 1.125v.375M0.75 6h22.5M2.25 6v9m19.5-9v9M2.25 15h19.5M2.25 15a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5m-19.5 0v-1.5A1.5 1.5 0 0 1 3.75 12h16.5a1.5 1.5 0 0 1 1.5 1.5V15',
      description: 'Transacciones realizadas'
    },
    {
      id: 'agregar',
      label: 'Agregar gasto',
      path: '/agregar-gasto',
      icon: 'M12 4.5v15m7.5-7.5h-15',
      description: 'Crea una nueva transaccion'
    },
    {
      id: 'reportes',
      label: 'Reportes',
      path: '/reportes',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 １-１.１２５-１．１２５V8．6２５ZM１６．５ 4．１２５c0-.6２１．５０４-１．１２５ １．１２５-１．１２５h２．２５C２０．４９６ 3 ２１ 3．５０４ ２１ 4．１２５v１５．７５c0 .6２１-.五百四一．１２５-１．１２５h-２．２５a₁．₁₂₅ ₁．₁₂₅ 0 0 ₁-₁．₁₂₅-₁．₁₂₅V4．₁₂₅Z',
      description: 'Tendencias y distribución de gasto'
    },
  ];

  protected selectSection(id: NavItem['id']): void {
    this.activeSection.set(id);
    const description = this.navItems.find(n => n.id == id)?.description ?? '';
    this.descriptionSection.set(description);
    this.sidebarOpen.set(false);
  }

  protected toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  protected onBudgetChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(value)) {
      this.budgetService.setMonthlyBudget(value);
    }
  }
}
