import { Injectable } from '@angular/core';
import { getDb } from '../../db/db';
import { Transaction } from '../models';
import { CategoryExpenseTotal } from '../models/categoryExpense';

@Injectable({providedIn: 'root'})
export class ExpenseService {

    constructor() { }

    async getAll(): Promise<Transaction[]> {
        const db = await getDb();
        return db.getAll('expenses');
    }

    async getTotalByCategory(): Promise<CategoryExpenseTotal[]> {
      const transactions = await this.getAll();
      const totals = new Map<string, number>();

      for (const transaction of transactions) {
          const current = totals.get(transaction.categoryId) ?? 0;
          totals.set(transaction.categoryId, current + transaction.amount);
      }

      return Array.from(totals, ([categoryId, total]) => ({ categoryId, total })) as CategoryExpenseTotal[];
    }

    async add(transaction: Transaction): Promise<void> {
        const db = await getDb();
        await db.add('expenses', transaction);
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
