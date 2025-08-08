import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCalendarioPyp } from '../models/tipo_calendario_pyp.model';

@Injectable({
  providedIn: 'root',
})
export class TipoCalendarioPypService {
  private apiUrl = 'http://localhost:8080/api/tipos-calendario-pyp';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoCalendarioPyp[]> {
    return this.http.get<TipoCalendarioPyp[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoCalendarioPyp> {
    return this.http.get<TipoCalendarioPyp>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoCalendarioPyp): Observable<TipoCalendarioPyp> {
    return this.http.post<TipoCalendarioPyp>(this.apiUrl, data);
  }

  update(id: number, data: TipoCalendarioPyp): Observable<TipoCalendarioPyp> {
    return this.http.put<TipoCalendarioPyp>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
