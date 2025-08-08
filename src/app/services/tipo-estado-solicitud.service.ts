import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEstadoSolicitud } from '../models/tipo_estado_solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class TipoEstadoSolicitudService {
  private apiUrl = 'http://localhost:8080/api/tipos-estado-solicitud';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoEstadoSolicitud[]> {
    return this.http.get<TipoEstadoSolicitud[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoEstadoSolicitud> {
    return this.http.get<TipoEstadoSolicitud>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoEstadoSolicitud): Observable<TipoEstadoSolicitud> {
    return this.http.post<TipoEstadoSolicitud>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoEstadoSolicitud
  ): Observable<TipoEstadoSolicitud> {
    return this.http.put<TipoEstadoSolicitud>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
