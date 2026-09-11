export interface CategoryCreateRequest {
    name:         string;
    budget_Limit: number;
    icon?:        string;
    text_color?:  string;
    color?:       string;
}

export interface CategoryUpdateRequest {
    name?:        string;
    budget_Limit?: number;
    icon?:        string;
    text_color?:  string;
    color?:       string;
}
