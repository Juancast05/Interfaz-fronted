import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoClasificacionEvidencia } from '../models/tipo_clasificacion_evidencia.model';

@Injectable({
  providedIn: 'root',
})
export class TipoClasificacionEvidenciaService {
  private apiUrl = 'http://localhost:8080/api/tipos-clasificacion-evidencia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoClasificacionEvidencia[]> {
    return this.http.get<TipoClasificacionEvidencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoClasificacionEvidencia> {
    return this.http.get<TipoClasificacionEvidencia>(`${this.apiUrl}/${id}`);
  }

  create(
    data: TipoClasificacionEvidencia
  ): Observable<TipoClasificacionEvidencia> {
    return this.http.post<TipoClasificacionEvidencia>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoClasificacionEvidencia
  ): Observable<TipoClasificacionEvidencia> {
    return this.http.put<TipoClasificacionEvidencia>(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
