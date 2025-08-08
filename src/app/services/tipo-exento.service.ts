import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoExento } from '../models/tipo_exento.model';

@Injectable({
  providedIn: 'root',
})
export class TipoExentoService {
  private apiUrl = 'http://localhost:8080/api/tipos-exento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoExento[]> {
    return this.http.get<TipoExento[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoExento> {
    return this.http.get<TipoExento>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoExento): Observable<TipoExento> {
    return this.http.post<TipoExento>(this.apiUrl, data);
  }

  update(id: number, data: TipoExento): Observable<TipoExento> {
    return this.http.put<TipoExento>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
