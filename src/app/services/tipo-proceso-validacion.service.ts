import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProcesoValidacion } from '../models/tipo_proceso_validacion.model';

@Injectable({
  providedIn: 'root',
})
export class TipoProcesoValidacionService {
  private apiUrl = 'http://localhost:8080/api/tipos-proceso-validacion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoProcesoValidacion[]> {
    return this.http.get<TipoProcesoValidacion[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoProcesoValidacion> {
    return this.http.get<TipoProcesoValidacion>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoProcesoValidacion): Observable<TipoProcesoValidacion> {
    return this.http.post<TipoProcesoValidacion>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoProcesoValidacion
  ): Observable<TipoProcesoValidacion> {
    return this.http.put<TipoProcesoValidacion>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
