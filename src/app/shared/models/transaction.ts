export interface Transaction {
  title: string;
  category: string;
  date: string;
  colorClass: string;
  amount: number;
  sumRestSign: '+' | '-';
}
