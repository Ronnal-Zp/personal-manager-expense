import { Injectable } from '@angular/core';
import { getDb } from '../../db/db';
import { Transaction } from '../models';

@Injectable({providedIn: 'root'})
export class ExpenseService {

    constructor() { }
    
    async getAll(): Promise<Transaction[]> {
        const db = await getDb();
        return db.getAll('expenses');
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