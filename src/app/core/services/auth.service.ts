import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs';
import { RegisterAdmin } from '../../data/interfaces/auth/register-admin.interface';
import { LoginRequest } from '../../data/interfaces/auth/login-request.interface';
import { JwtResponse } from '../../data/interfaces/auth/jwt-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private API_URL = environment.urlBack + '/auth';

  login(data: LoginRequest) {
    return this.http.post<JwtResponse>(`${this.API_URL}/login`, data).pipe(
      tap((res) => {
        if (this.isBrowser()) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res));
        }
      })
    );
  }

  registerAdmin(data: RegisterAdmin) {
    return this.http.post(`${this.API_URL}/register`, data);
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

  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  isSessionValid(): boolean {
    return !this.isTokenExpired() && this.isAdmin();
  }

  isLogged(): boolean {
    if (!this.getToken()) return false;
    if (this.isTokenExpired()) {
      this.logout();
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    if (!this.isLogged()) return false;

    const user = localStorage.getItem('user');
    if (!user) return false;

    const parsed = JSON.parse(user);
    return parsed.authorities?.some((a: any) => a.authority === 'ROLE_ADMIN');
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
