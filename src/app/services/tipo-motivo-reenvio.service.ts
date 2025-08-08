import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMotivoReenvio } from '../models/tipo_motivo_reenvio.model';

@Injectable({
  providedIn: 'root',
})
export class TipoMotivoReenvioService {
  private apiUrl = 'http://localhost:8080/api/tipos-motivo-reenvio';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoMotivoReenvio[]> {
    return this.http.get<TipoMotivoReenvio[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoMotivoReenvio> {
    return this.http.get<TipoMotivoReenvio>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoMotivoReenvio): Observable<TipoMotivoReenvio> {
    return this.http.post<TipoMotivoReenvio>(this.apiUrl, data);
  }

  update(id: number, data: TipoMotivoReenvio): Observable<TipoMotivoReenvio> {
    return this.http.put<TipoMotivoReenvio>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
