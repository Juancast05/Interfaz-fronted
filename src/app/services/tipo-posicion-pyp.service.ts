import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPosicionPyp } from '../models/tipo_posicion_pyp.model';

@Injectable({
  providedIn: 'root',
})
export class TipoPosicionPypService {
  private apiUrl = 'http://localhost:8080/api/tipos-posicion-pyp';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoPosicionPyp[]> {
    return this.http.get<TipoPosicionPyp[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoPosicionPyp> {
    return this.http.get<TipoPosicionPyp>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoPosicionPyp): Observable<TipoPosicionPyp> {
    return this.http.post<TipoPosicionPyp>(this.apiUrl, data);
  }

  update(id: number, data: TipoPosicionPyp): Observable<TipoPosicionPyp> {
    return this.http.put<TipoPosicionPyp>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
