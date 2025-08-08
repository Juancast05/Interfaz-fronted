import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCaracterPuntaje } from '../models/tipo_caracter_puntaje.model';

@Injectable({
  providedIn: 'root',
})
export class TipoCaracterPuntajeService {
  private apiUrl = 'http://localhost:8080/api/tipos-caracter-puntaje'; // Endpoint asumido

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoCaracterPuntaje[]> {
    return this.http.get<TipoCaracterPuntaje[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoCaracterPuntaje> {
    return this.http.get<TipoCaracterPuntaje>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoCaracterPuntaje): Observable<TipoCaracterPuntaje> {
    return this.http.post<TipoCaracterPuntaje>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoCaracterPuntaje
  ): Observable<TipoCaracterPuntaje> {
    return this.http.put<TipoCaracterPuntaje>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
