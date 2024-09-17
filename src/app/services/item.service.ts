import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/item.json';

  constructor(private http: HttpClient) { }

  getItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

