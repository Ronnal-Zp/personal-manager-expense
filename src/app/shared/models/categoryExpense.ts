export interface CategoryExpense {
  id: string;
  name: CategoryEnum;
  color: string;
  icon?: string | null;
  budgetLimit?: number | null;
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
  { id: '1', name: CategoryEnum.COMIDA, color: 'bg-orange-400', icon: null, budgetLimit: null },
  { id: '2', name: CategoryEnum.TRANSPORTE, color: 'bg-blue-400', icon: null, budgetLimit: null },
  { id: '3', name: CategoryEnum.VIVIENDA, color: 'bg-emerald-400', icon: null, budgetLimit: null },
  { id: '4', name: CategoryEnum.ENTRETENIMIENTO, color: 'bg-purple-400', icon: null, budgetLimit: null },
  { id: '5', name: CategoryEnum.SALUD, color: 'bg-pink-400', icon: null, budgetLimit: null },
  { id: '6', name: CategoryEnum.OTRO, color: 'bg-gray-400', icon: null, budgetLimit: null },
];
