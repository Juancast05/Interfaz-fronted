import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoTecnologia } from '../models/tipo_tecnologia.model';

@Injectable({
  providedIn: 'root',
})
export class TipoTecnologiaService {
  private apiUrl = 'http://localhost:8080/api/tipos-tecnologia';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoTecnologia[]> {
    return this.http.get<TipoTecnologia[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoTecnologia> {
    return this.http.get<TipoTecnologia>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoTecnologia): Observable<TipoTecnologia> {
    return this.http.post<TipoTecnologia>(this.apiUrl, data);
  }

  update(id: number, data: TipoTecnologia): Observable<TipoTecnologia> {
    return this.http.put<TipoTecnologia>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
