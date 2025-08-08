import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProcesoValidaSistema } from '../models/tipo_proceso_valida_sistema.model';

@Injectable({
  providedIn: 'root',
})
export class TipoProcesoValidaSistemaService {
  private apiUrl = 'http://localhost:8080/api/tipos-proceso-valida-sistema';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoProcesoValidaSistema[]> {
    return this.http.get<TipoProcesoValidaSistema[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoProcesoValidaSistema> {
    return this.http.get<TipoProcesoValidaSistema>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoProcesoValidaSistema): Observable<TipoProcesoValidaSistema> {
    return this.http.post<TipoProcesoValidaSistema>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoProcesoValidaSistema
  ): Observable<TipoProcesoValidaSistema> {
    return this.http.put<TipoProcesoValidaSistema>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
