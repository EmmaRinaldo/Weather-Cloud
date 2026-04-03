import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private profileSubject = new BehaviorSubject<any>(null);
  public profile$ = this.profileSubject.asObservable();

  isLoading = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = this.getToken();
    if (token) {
      const profile = this.decodeTokenPayload(token);
      this.profileSubject.next(profile);
    }
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
      tap(res => {
        this.storeSession(res.token, res.user);
        this.router.navigate(['/home']);
      })
    );
  }

  register(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${environment.apiUrl}/api/auth/register`, { email, password }).pipe(
      tap(res => {
        this.storeSession(res.token, res.user);
        this.router.navigate(['/home']);
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.profileSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  getProfile() {
    return this.profileSubject.value;
  }

  private storeSession(token: string, user: any) {
    localStorage.setItem('jwt_token', token);
    this.profileSubject.next(user);
  }

  private decodeTokenPayload(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }
}
