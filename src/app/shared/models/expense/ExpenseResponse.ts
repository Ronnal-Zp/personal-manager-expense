export interface ExpenseCreateResponse {
    id:            number;
    title:         string;
    description:   string;
    date:          Date;
    amount:        number;
    sum_rest_sign: string;
    category:      CategoryResponse;
    user_owner:    number;
}

export interface CategoryResponse {
    id:           number;
    name:         string;
    budget_Limit: number;
    icon:         string;
    text_color:   string;
    color:        string;
    user_owner:   number;
}
