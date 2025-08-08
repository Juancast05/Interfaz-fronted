import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoProveedorCamara } from '../models/tipo_proveedor_camara.model';

@Injectable({
  providedIn: 'root',
})
export class TipoProveedorCamaraService {
  private apiUrl = 'http://localhost:8080/api/tipos-proveedor-camara';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoProveedorCamara[]> {
    return this.http.get<TipoProveedorCamara[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoProveedorCamara> {
    return this.http.get<TipoProveedorCamara>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoProveedorCamara): Observable<TipoProveedorCamara> {
    return this.http.post<TipoProveedorCamara>(this.apiUrl, data);
  }

  update(
    id: number,
    data: TipoProveedorCamara
  ): Observable<TipoProveedorCamara> {
    return this.http.put<TipoProveedorCamara>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
