import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';

import { RegisterAdmin } from '../../data/interfaces/auth/register-admin.interface';
import { LoginRequest } from '../../data/interfaces/auth/login-request.interface';
import { JwtResponse } from '../../data/interfaces/auth/jwt-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private API_URL = 'http://localhost:8080/auth';

  login(data: LoginRequest) {
    return this.http
      .post<JwtResponse>(`${this.API_URL}/login`, data)
      .pipe(
        tap(res => {
          if (this.isBrowser()) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res));
          }
        })
      );
  }

  registerAdmin(data: RegisterAdmin) {
    return this.http.post(`${this.API_URL}/register-admin`, data);
  }

  /* SESSION HELPERS */

  logout() {
    if (!this.isBrowser()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  getToken(): string | null {
    if (!this.isBrowser()) return null;

    return localStorage.getItem('token');
  }
  isLogged(): boolean {
    return !!this.getToken();
  }
  isAdmin(): boolean {
    if (!this.isBrowser()) return false;

    const user = localStorage.getItem('user');
    if (!user) return false;

    const parsed = JSON.parse(user);
    return parsed.authorities?.some(
      (a: any) => a.authority === 'ROLE_ADMIN'
    );
  }
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
