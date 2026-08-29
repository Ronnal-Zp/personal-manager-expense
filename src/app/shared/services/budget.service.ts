import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'expense-manager:monthly-budget';
const DEFAULT_BUDGET = 1000;

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private readonly _monthlyBudget = signal<number>(this.loadFromStorage());
  readonly monthlyBudget = this._monthlyBudget.asReadonly();

  setMonthlyBudget(value: number): void {
    this._monthlyBudget.set(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }

  private loadFromStorage(): number {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored !== null ? Number(stored) : NaN;
    return Number.isFinite(parsed) ? parsed : DEFAULT_BUDGET;
  }
}
