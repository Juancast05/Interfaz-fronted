import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoFormatoPlaca } from '../models/tipo_formato_placa.model';

@Injectable({
  providedIn: 'root',
})
export class TipoFormatoPlacaService {
  private apiUrl = 'http://localhost:8080/api/tipos-formato-placa';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoFormatoPlaca[]> {
    return this.http.get<TipoFormatoPlaca[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoFormatoPlaca> {
    return this.http.get<TipoFormatoPlaca>(`${this.apiUrl}/${id}`);
  }

  create(data: TipoFormatoPlaca): Observable<TipoFormatoPlaca> {
    return this.http.post<TipoFormatoPlaca>(this.apiUrl, data);
  }

  update(id: number, data: TipoFormatoPlaca): Observable<TipoFormatoPlaca> {
    return this.http.put<TipoFormatoPlaca>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
