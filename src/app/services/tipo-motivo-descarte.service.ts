import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMotivoDescarte } from '../models/tipo_motivo_descarte.model';

@Injectable({
  providedIn: 'root',
})
export class TipoMotivoDescarteService {
  private apiUrl = 'http://localhost:8080/api/tipos-motivo-descarte';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoMotivoDescarte[]> {
    return this.http.get<TipoMotivoDescarte[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoMotivoDescarte> {
    return this.http.get<TipoMotivoDescarte>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoMotivoDescarte): Observable<TipoMotivoDescarte> {
    return this.http.post<TipoMotivoDescarte>(this.apiUrl, data);
  }

  update(id: number, data: TipoMotivoDescarte): Observable<TipoMotivoDescarte> {
    return this.http.put<TipoMotivoDescarte>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
