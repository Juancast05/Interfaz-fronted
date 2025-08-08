import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCarril } from '../models/tipo_carril.model';

@Injectable({
  providedIn: 'root',
})
export class TipoCarrilService {
  private apiUrl = 'http://localhost:8080/api/tipos-carril'; // Endpoint asumido

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoCarril[]> {
    return this.http.get<TipoCarril[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoCarril> {
    return this.http.get<TipoCarril>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoCarril): Observable<TipoCarril> {
    return this.http.post<TipoCarril>(this.apiUrl, data);
  }

  update(id: number, data: TipoCarril): Observable<TipoCarril> {
    return this.http.put<TipoCarril>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
