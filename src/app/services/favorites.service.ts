import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = 'http://localhost:5257/api/Favorites'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
        throw new Error('No access token found'); 
    }
    console.log("Token included in request headers:", token);
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  

  addFavorite(championId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.baseUrl, { championId }, { headers });
  }
  

  getFavorites(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.baseUrl, { headers }).pipe(
    map((response: any) => response.data || []));
  }
  
  removeFavorite(championId: string): Observable<any> {
    console.log(`Sending DELETE request for Champion ID: ${championId}`);
    const token = this.authService.getToken();
    if (!token) {
      console.error('User is not authenticated.');
    }
  
    const url = `http://localhost:5257/api/Favorites/${championId}`;
    return this.http.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'json',
    });
  }
  

}
