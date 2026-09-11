import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ExpenseCreateRequest } from '../models/expense/ExpenseRequest';
import { ExpenseCreateResponse, ExpenseItemResponse, TotalExpenseByCategory } from '../models/expense/ExpenseResponse';
import { ResponseListI } from '../models/ResponseApi';
import { PageQuery } from '../models/PageQuery';

@Injectable({providedIn: 'root'})
export class ExpenseService {

    http = inject(HttpClient);
    BASE_URL = environment.BASE_URL
    
    getAll(pageQuery: PageQuery) {
        return this.http.get<ResponseListI<ExpenseItemResponse>>(`${this.BASE_URL}/expense`, {
            params: { ...pageQuery }
        });
    }

    getAllByCategory(category_id: number, pageQuery: PageQuery) {
        return this.http.get<ResponseListI<ExpenseItemResponse>>(`${this.BASE_URL}/expense/category/${category_id}`, {
            params: { ...pageQuery }
        });
    }

    getTotalByCategory() {
        return this.http.get<ResponseListI<TotalExpenseByCategory>>(`${this.BASE_URL}/expense/totalByCategory`)
    }

    add(expense: ExpenseCreateRequest) {
        return this.http.post<ExpenseCreateResponse>(`${this.BASE_URL}/expense`, expense);
    }

}
