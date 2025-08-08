import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoClaseVehiculo } from '../models/tipo_clase_vehiculo.model';

@Injectable({
  providedIn: 'root',
})
export class TipoClaseVehiculoService {
  private apiUrl = 'http://localhost:8080/api/tipos-clase-vehiculo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoClaseVehiculo[]> {
    return this.http.get<TipoClaseVehiculo[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoClaseVehiculo> {
    return this.http.get<TipoClaseVehiculo>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoClaseVehiculo): Observable<TipoClaseVehiculo> {
    return this.http.post<TipoClaseVehiculo>(this.apiUrl, data);
  }

  update(id: number, data: TipoClaseVehiculo): Observable<TipoClaseVehiculo> {
    return this.http.put<TipoClaseVehiculo>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
