import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponseListI } from '../models/ResponseApi';
import { CategoryResponseI } from '../models/category/CategoryResponse';

@Injectable({providedIn: 'root'})
export class CategoryService {
    http = inject(HttpClient);
    BASE_URL = environment.BASE_URL;
    
    getAll() {
        return this.http.get<ResponseListI<CategoryResponseI>>(`${this.BASE_URL}/category`);
    }

}