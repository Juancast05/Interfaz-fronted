import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProcesoAutomatico } from '../models/tipo_proceso_automatico.model';

@Injectable({
  providedIn: 'root',
})
export class TipoProcesoAutomaticoService {
  private apiUrl = 'http://localhost:8080/api/tipos-proceso-automatico';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoProcesoAutomatico[]> {
    return this.http.get<TipoProcesoAutomatico[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoProcesoAutomatico> {
    return this.http.get<TipoProcesoAutomatico>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoProcesoAutomatico): Observable<TipoProcesoAutomatico> {
    return this.http.post<TipoProcesoAutomatico>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoProcesoAutomatico
  ): Observable<TipoProcesoAutomatico> {
    return this.http.put<TipoProcesoAutomatico>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
