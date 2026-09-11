import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ResponseListI } from '../models/ResponseApi';
import { CategoryResponseI } from '../models/category/CategoryResponse';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../models/category/CategoryRequest';
import { PageQuery } from '../models/PageQuery';

const DEFAULT_PAGE_QUERY: PageQuery = { page: 1, limit: 255 };

@Injectable({providedIn: 'root'})
export class CategoryService {
    http = inject(HttpClient);
    BASE_URL = environment.BASE_URL;

    getAll(pageQuery: PageQuery = DEFAULT_PAGE_QUERY) {
        return this.http.get<ResponseListI<CategoryResponseI>>(`${this.BASE_URL}/category`, {
            params: { ...pageQuery }
        });
    }

    getById(id: number) {
        return this.http.get<CategoryResponseI>(`${this.BASE_URL}/category/${id}`);
    }

    add(category: CategoryCreateRequest) {
        return this.http.post<CategoryResponseI>(`${this.BASE_URL}/category`, category);
    }

    update(id: number, category: CategoryUpdateRequest) {
        return this.http.put<CategoryResponseI>(`${this.BASE_URL}/category/${id}`, category);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.BASE_URL}/category/${id}`);
    }

}
