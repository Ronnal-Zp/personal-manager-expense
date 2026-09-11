export interface ExpenseCreateRequest {
    title:         string;
    description:   string;
    date:          Date;
    amount:        number;
    sum_rest_sign: string;
    category_id:   number;
}
