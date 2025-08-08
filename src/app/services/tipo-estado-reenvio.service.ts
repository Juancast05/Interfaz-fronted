import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEstadoReenvio } from '../models/tipo_estado_reenvio.model';

@Injectable({
  providedIn: 'root',
})
export class TipoEstadoReenvioService {
  private apiUrl = 'http://localhost:8080/api/tipos-estado-reenvio';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoEstadoReenvio[]> {
    return this.http.get<TipoEstadoReenvio[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoEstadoReenvio> {
    return this.http.get<TipoEstadoReenvio>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoEstadoReenvio): Observable<TipoEstadoReenvio> {
    return this.http.post<TipoEstadoReenvio>(this.apiUrl, data);
  }

  update(id: number, data: TipoEstadoReenvio): Observable<TipoEstadoReenvio> {
    return this.http.put<TipoEstadoReenvio>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
