import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoFuenteEvidencia } from '../models/tipo_fuente_evidencia.model';

@Injectable({
  providedIn: 'root',
})
export class TipoFuenteEvidenciaService {
  private apiUrl = 'http://localhost:8080/api/tipos-fuente-evidencia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoFuenteEvidencia[]> {
    return this.http.get<TipoFuenteEvidencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoFuenteEvidencia> {
    return this.http.get<TipoFuenteEvidencia>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoFuenteEvidencia): Observable<TipoFuenteEvidencia> {
    return this.http.post<TipoFuenteEvidencia>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoFuenteEvidencia
  ): Observable<TipoFuenteEvidencia> {
    return this.http.put<TipoFuenteEvidencia>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
