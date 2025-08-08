import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoClaseInfraccion } from '../models/tipo_clase_infraccion.model';

@Injectable({
  providedIn: 'root',
})
export class TipoClaseInfraccionService {
  private apiUrl = 'http://localhost:8080/api/tipos-clase-infraccion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoClaseInfraccion[]> {
    return this.http.get<TipoClaseInfraccion[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoClaseInfraccion> {
    return this.http.get<TipoClaseInfraccion>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoClaseInfraccion): Observable<TipoClaseInfraccion> {
    return this.http.post<TipoClaseInfraccion>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoClaseInfraccion
  ): Observable<TipoClaseInfraccion> {
    return this.http.put<TipoClaseInfraccion>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
