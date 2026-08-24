import { CategoryEnum } from "./categoryExpense";

export interface Transaction {
  id: number;
  title: string;
  categoryId: CategoryEnum;
  description?: string;
  date: string;
  colorClass: string;
  amount: number;
  sumRestSign: '+' | '-';
}
