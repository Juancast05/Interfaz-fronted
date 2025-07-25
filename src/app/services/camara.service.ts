// src/app/services/camara.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camara } from '../models/camara.model'; // RUTA CORRECTA A TU MODELO CAMARA

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  private BASE_URL = 'http://localhost:8080/api/camaras'; // Ajusta si tu puerto o ruta base es diferente

  constructor(private http: HttpClient) {}

  getAllCamaras(): Observable<Camara[]> {
    return this.http.get<Camara[]>(this.BASE_URL);
  }

  getCamaraById(id: number): Observable<Camara> {
    // Asegúrate de que tu backend usa 'Long' para el ID si es lo que recibe,
    // o que el ID en Angular es compatible con 'number' en TypeScript.
    // En tu CamaraRepository era Long, en tu entidad Camara era Integer,
    // lo mas coherente sería que el ID en tu controlador sea Integer y que aquí en Angular sea number.
    // Asumiré que el tipo de ID en tu backend es compatible con 'number' en Angular.
    return this.http.get<Camara>(`${this.BASE_URL}/${id}`);
  }

  createCamara(camara: Camara): Observable<Camara> {
    return this.http.post<Camara>(this.BASE_URL, camara);
  }

  // **IMPORTANTE:** Este método asume que ya has añadido el endpoint PUT en tu CamaraController de Spring Boot
  // Si no lo has hecho, este método no funcionará hasta que lo implementes en el backend.
  updateCamara(id: number, camara: Camara): Observable<Camara> {
    return this.http.put<Camara>(`${this.BASE_URL}/${id}`, camara);
  }

  deleteCamara(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
