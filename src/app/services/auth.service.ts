import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5257/api/User'; 

  constructor(private readonly http: HttpClient) {}

  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response?.data?.accessToken) { 
          this.saveToken(response.data.accessToken); 
          console.log('Token saved:', response.data.accessToken); 
        }
      })
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('favorites');
    return this.http.post(`${this.baseUrl}/logout`, {});

  }

  saveToken(token: string): void {
    console.log('Token saved:', token); // Debug log
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logoutUser(): void {
    localStorage.removeItem('access_token');
  }
}

