import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../models/auth/LoginRequest';
import { LoginResponse } from '../models/auth/LoginResponse';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly BASE_URL = environment.BASE_URL;

    login(credentials: LoginRequest) {
        return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, credentials);
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        localStorage.removeItem('token');
    }
}
