import { inject, Injectable } from '@angular/core';
import { getDb } from '../../db/db';
import { Transaction } from '../models';
import { CategoryExpenseTotal } from '../models/categoryExpense';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpenseCreateRequest } from '../models/expense/ExpenseRequest';
import { ExpenseCreateResponse } from '../models/expense/ExpenseResponse';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ExpenseService {

    http = inject(HttpClient);
    BASE_URL = environment.BASE_URL
    
    async getAll(): Promise<Transaction[]> {
        const db = await getDb();
        return db.getAll('expenses');
    }

    async getTotalByCategory(): Promise<CategoryExpenseTotal[]> {
      const transactions = await this.getAll();
      const totals = new Map<number, number>();

      for (const transaction of transactions) {
          const current = totals.get(transaction.categoryId) ?? 0;
          totals.set(transaction.categoryId, current + transaction.amount);
      }

      return Array.from(totals, ([categoryId, total]) => ({ categoryId, total })) as CategoryExpenseTotal[];
    }

    add(expense: ExpenseCreateRequest) {
        return this.http.post<ExpenseCreateResponse>(`${this.BASE_URL}/expense`, expense);
    }

    async update(transaction: Transaction): Promise<void> {
        const db = await getDb();
        await db.put('expenses', transaction);
    }

    async delete(id: string): Promise<void> {
        const db = await getDb();
        await db.delete('expenses', id);
    }

}
