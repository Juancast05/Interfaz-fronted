import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCodigoInfraccion } from '../models/tipo_codigo_infraccion.model';

@Injectable({
  providedIn: 'root',
})
export class TipoCodigoInfraccionService {
  private apiUrl = 'http://localhost:8080/api/tipos-codigo-infraccion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoCodigoInfraccion[]> {
    return this.http.get<TipoCodigoInfraccion[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoCodigoInfraccion> {
    return this.http.get<TipoCodigoInfraccion>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoCodigoInfraccion): Observable<TipoCodigoInfraccion> {
    return this.http.post<TipoCodigoInfraccion>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoCodigoInfraccion
  ): Observable<TipoCodigoInfraccion> {
    return this.http.put<TipoCodigoInfraccion>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
