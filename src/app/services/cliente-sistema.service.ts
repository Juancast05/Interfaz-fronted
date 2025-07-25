// src/app/services/cliente-sistema.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteSistema } from '../models/cliente-sistema.model'; // RUTA CORRECTA A TU MODELO CLIENTE_SISTEMA

@Injectable({
  providedIn: 'root',
})
export class ClienteSistemaService {
  private BASE_URL = 'http://localhost:8080/api/clientes'; // Ajusta si tu puerto o ruta base es diferente

  constructor(private http: HttpClient) {}

  getAllClientesSistema(): Observable<ClienteSistema[]> {
    return this.http.get<ClienteSistema[]>(this.BASE_URL);
  }

  createClienteSistema(cliente: ClienteSistema): Observable<ClienteSistema> {
    return this.http.post<ClienteSistema>(this.BASE_URL, cliente);
  }

  // Si en el futuro necesitas obtener un cliente por ID, o actualizar/eliminar,
  // añadirías métodos aquí y los endpoints correspondientes en tu controlador de Spring Boot.
}
