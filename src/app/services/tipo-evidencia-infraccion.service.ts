import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEvidenciaInfraccion } from '../models/tipo_evidencia_infraccion.model';

@Injectable({
  providedIn: 'root',
})
export class TipoEvidenciaInfraccionService {
  private apiUrl = 'http://localhost:8080/api/tipos-evidencia-infraccion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoEvidenciaInfraccion[]> {
    return this.http.get<TipoEvidenciaInfraccion[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoEvidenciaInfraccion> {
    return this.http.get<TipoEvidenciaInfraccion>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoEvidenciaInfraccion): Observable<TipoEvidenciaInfraccion> {
    return this.http.post<TipoEvidenciaInfraccion>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoEvidenciaInfraccion
  ): Observable<TipoEvidenciaInfraccion> {
    return this.http.put<TipoEvidenciaInfraccion>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
