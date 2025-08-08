import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoServicio } from '../models/tipo_servicio.model';

@Injectable({
  providedIn: 'root',
})
export class TipoServicioService {
  private apiUrl = 'http://localhost:8080/api/tipos-servicio';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoServicio[]> {
    return this.http.get<TipoServicio[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoServicio> {
    return this.http.get<TipoServicio>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoServicio): Observable<TipoServicio> {
    return this.http.post<TipoServicio>(this.apiUrl, data);
  }

  update(id: number, data: TipoServicio): Observable<TipoServicio> {
    return this.http.put<TipoServicio>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
