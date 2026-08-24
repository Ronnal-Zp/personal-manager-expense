export interface CategoryExpense {
  id: string;
  name: string;
  color: string;
  icon?: string;
  budgetLimit?: number;
}

export enum CategoryEnum {
    COMIDA = 'Comida',
    TRANSPORTE = 'Transporte',
    VIVIENDA = 'Vivienda',
    ENTRETENIMIENTO = 'Entretenimiento',
    SALUD = 'Salud',
    OTRO = 'Otro'
}
