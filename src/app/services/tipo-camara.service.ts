import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCamara } from '../models/tipo_camara.model';

@Injectable({
  providedIn: 'root',
})
export class TipoCamaraService {
  private apiUrl = 'http://localhost:8080/api/tipos-camara'; // Endpoint asumido

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoCamara[]> {
    return this.http.get<TipoCamara[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoCamara> {
    return this.http.get<TipoCamara>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoCamara): Observable<TipoCamara> {
    return this.http.post<TipoCamara>(this.apiUrl, data);
  }

  update(id: number, data: TipoCamara): Observable<TipoCamara> {
    return this.http.put<TipoCamara>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
