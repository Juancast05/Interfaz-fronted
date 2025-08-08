import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoJornadaPyp } from '../models/tipo_jornada_pyp.model';

@Injectable({
  providedIn: 'root',
})
export class TipoJornadaPypService {
  private apiUrl = 'http://localhost:8080/api/tipos-jornada-pyp';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoJornadaPyp[]> {
    return this.http.get<TipoJornadaPyp[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoJornadaPyp> {
    return this.http.get<TipoJornadaPyp>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoJornadaPyp): Observable<TipoJornadaPyp> {
    return this.http.post<TipoJornadaPyp>(this.apiUrl, data);
  }

  update(id: number, data: TipoJornadaPyp): Observable<TipoJornadaPyp> {
    return this.http.put<TipoJornadaPyp>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
