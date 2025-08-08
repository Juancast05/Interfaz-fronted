import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoServicioPlataforma } from '../models/tipo_servicio_plataforma.model';

@Injectable({
  providedIn: 'root',
})
export class TipoServicioPlataformaService {
  private apiUrl = 'http://localhost:8080/api/tipos-servicio-plataforma';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoServicioPlataforma[]> {
    return this.http.get<TipoServicioPlataforma[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoServicioPlataforma> {
    return this.http.get<TipoServicioPlataforma>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoServicioPlataforma): Observable<TipoServicioPlataforma> {
    return this.http.post<TipoServicioPlataforma>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoServicioPlataforma
  ): Observable<TipoServicioPlataforma> {
    return this.http.put<TipoServicioPlataforma>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
