import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMotivoExento } from '../models/tipo_motivo_exento.model';

@Injectable({
  providedIn: 'root',
})
export class TipoMotivoExentoService {
  private apiUrl = 'http://localhost:8080/api/tipos-motivo-exento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoMotivoExento[]> {
    return this.http.get<TipoMotivoExento[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoMotivoExento> {
    return this.http.get<TipoMotivoExento>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoMotivoExento): Observable<TipoMotivoExento> {
    return this.http.post<TipoMotivoExento>(this.apiUrl, data);
  }

  update(id: number, data: TipoMotivoExento): Observable<TipoMotivoExento> {
    return this.http.put<TipoMotivoExento>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
