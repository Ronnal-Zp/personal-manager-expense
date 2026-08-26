import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { CategoryExpense, Transaction } from '../shared/models';

interface ExpenseManagerDb extends DBSchema {
  expenses: {
    key: string;
    value: Transaction;
    indexes: { 'by-date': string; 'by-category': string };
  };
  categories: {
    key: string;
    value: CategoryExpense;
  };
}

const DB_NAME = 'expense-manager';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<ExpenseManagerDb>> | null = null;

export function getDb(): Promise<IDBPDatabase<ExpenseManagerDb>> {
  if (!dbPromise) {
    dbPromise = openDB<ExpenseManagerDb>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const expenseStore = db.createObjectStore('expenses', { keyPath: 'id' });
        expenseStore.createIndex('by-date', 'date');
        expenseStore.createIndex('by-category', 'categoryId');

        db.createObjectStore('categories', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

export type { ExpenseManagerDb };
