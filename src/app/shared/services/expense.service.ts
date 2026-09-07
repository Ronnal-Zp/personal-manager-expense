import { inject, Injectable } from '@angular/core';
import { getDb } from '../../db/db';
import { Transaction } from '../models';
import { CategoryExpenseTotal } from '../models/categoryExpense';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExpenseCreateRequest } from '../models/expense/ExpenseRequest';
import { ExpenseCreateResponse, ExpenseItemResponse } from '../models/expense/ExpenseResponse';
import { ResponseListI } from '../models/ResponseApi';
import { PageQuery } from '../models/PageQuery';

@Injectable({providedIn: 'root'})
export class ExpenseService {

    http = inject(HttpClient);
    BASE_URL = environment.BASE_URL
    
    getAll(pageQuery: PageQuery) {
        return this.http.get<ResponseListI<ExpenseItemResponse>>(`${this.BASE_URL}/expense`, {
            params: { ...pageQuery }
        });
    }

    getAllByCategory(category_id: number, pageQuery: PageQuery) {
        return this.http.get<ResponseListI<ExpenseItemResponse>>(`${this.BASE_URL}/expense/category/${category_id}`, {
            params: { ...pageQuery }
        });
    }

    async getTotalByCategory(): Promise<CategoryExpenseTotal[]> {
    //   const transactions = await this.getAll();
    //   const totals = new Map<number, number>();

    //   for (const transaction of transactions) {
    //       const current = totals.get(transaction.categoryId) ?? 0;
    //       totals.set(transaction.categoryId, current + transaction.amount);
    //   }

      return Promise.resolve([])
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
