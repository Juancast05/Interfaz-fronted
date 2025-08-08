import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEstadoEvidencia } from '../models/tipo_estado_evidencia.model';

@Injectable({
  providedIn: 'root',
})
export class TipoEstadoEvidenciaService {
  private apiUrl = 'http://localhost:8080/api/tipos-estado-evidencia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoEstadoEvidencia[]> {
    return this.http.get<TipoEstadoEvidencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoEstadoEvidencia> {
    return this.http.get<TipoEstadoEvidencia>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoEstadoEvidencia): Observable<TipoEstadoEvidencia> {
    return this.http.post<TipoEstadoEvidencia>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoEstadoEvidencia
  ): Observable<TipoEstadoEvidencia> {
    return this.http.put<TipoEstadoEvidencia>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
