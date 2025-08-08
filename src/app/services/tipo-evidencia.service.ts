import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEvidencia } from '../models/tipo_evidencia.model';

@Injectable({
  providedIn: 'root',
})
export class TipoEvidenciaService {
  private apiUrl = 'http://localhost:8080/api/tipos-evidencia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoEvidencia[]> {
    return this.http.get<TipoEvidencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoEvidencia> {
    return this.http.get<TipoEvidencia>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoEvidencia): Observable<TipoEvidencia> {
    return this.http.post<TipoEvidencia>(this.apiUrl, data);
  }

  update(id: number, data: TipoEvidencia): Observable<TipoEvidencia> {
    return this.http.put<TipoEvidencia>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
