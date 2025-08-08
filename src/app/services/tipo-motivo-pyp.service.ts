import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoMotivoPyp } from '../models/tipo_motivo_pyp.model';

@Injectable({
  providedIn: 'root',
})
export class TipoMotivoPypService {
  private apiUrl = 'http://localhost:8080/api/tipos-motivo-pyp';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoMotivoPyp[]> {
    return this.http.get<TipoMotivoPyp[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoMotivoPyp> {
    return this.http.get<TipoMotivoPyp>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoMotivoPyp): Observable<TipoMotivoPyp> {
    return this.http.post<TipoMotivoPyp>(this.apiUrl, data);
  }

  update(id: number, data: TipoMotivoPyp): Observable<TipoMotivoPyp> {
    return this.http.put<TipoMotivoPyp>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
