import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoVehiculo } from '../models/tipo_vehiculo.model';

@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoService {
  private apiUrl = 'http://localhost:8080/api/tipos-vehiculo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoVehiculo> {
    return this.http.get<TipoVehiculo>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoVehiculo): Observable<TipoVehiculo> {
    return this.http.post<TipoVehiculo>(this.apiUrl, data);
  }

  update(id: number, data: TipoVehiculo): Observable<TipoVehiculo> {
    return this.http.put<TipoVehiculo>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
