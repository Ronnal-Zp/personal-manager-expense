export interface CategoryExpense {
  id: string;
  name: CategoryEnum;
  color: string;
  icon?: string | null;
  budgetLimit?: number | null;
  totalSpent?: number | null;
}

export interface CategoryExpenseTotal {
  categoryId: CategoryEnum;
  total: number;
}

export enum CategoryEnum {
    COMIDA = 'Comida',
    TRANSPORTE = 'Transporte',
    VIVIENDA = 'Vivienda',
    ENTRETENIMIENTO = 'Entretenimiento',
    SALUD = 'Salud',
    OTRO = 'Otro'
}

export const CATEGORIES: CategoryExpense[] = [
  { id: '1', name: CategoryEnum.COMIDA, color: 'bg-orange-400', icon: null, budgetLimit: 90 },
  { id: '2', name: CategoryEnum.TRANSPORTE, color: 'bg-blue-400', icon: null, budgetLimit: 60 },
  { id: '3', name: CategoryEnum.VIVIENDA, color: 'bg-emerald-400', icon: null, budgetLimit: 70 },
  { id: '4', name: CategoryEnum.ENTRETENIMIENTO, color: 'bg-purple-400', icon: null, budgetLimit: 50 },
  { id: '5', name: CategoryEnum.SALUD, color: 'bg-pink-400', icon: null, budgetLimit: 70 },
  { id: '6', name: CategoryEnum.OTRO, color: 'bg-gray-400', icon: null, budgetLimit: 100 },
];
