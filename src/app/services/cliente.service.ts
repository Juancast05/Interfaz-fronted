// src/app/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteSistema } from '../models/cliente-sistema.model'; // Importa el modelo de cliente

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes'; // URL base de tu API de clientes en Spring Boot

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los clientes del sistema.
   * @returns Un Observable que emite un array de objetos ClienteSistema.
   */
  getAllClientes(): Observable<ClienteSistema[]> {
    return this.http.get<ClienteSistema[]>(this.apiUrl);
  }

  /**
   * Obtiene un cliente específico por su ID.
   * @param id El ID del cliente a buscar (number).
   * @returns Un Observable que emite el objeto ClienteSistema encontrado.
   */
  getClienteById(id: number): Observable<ClienteSistema> {
    return this.http.get<ClienteSistema>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo cliente en el sistema.
   * @param cliente El objeto ClienteSistema a crear.
   * @returns Un Observable que emite el objeto ClienteSistema creado (con su ID asignado por el backend).
   */
  createCliente(cliente: ClienteSistema): Observable<ClienteSistema> {
    return this.http.post<ClienteSistema>(this.apiUrl, cliente);
  }

  /**
   * Actualiza un cliente existente por su ID.
   * @param id El ID del cliente a actualizar (number).
   * @param cliente Los datos actualizados del cliente.
   * @returns Un Observable que emite el objeto ClienteSistema actualizado.
   */
  updateCliente(
    id: number,
    cliente: ClienteSistema
  ): Observable<ClienteSistema> {
    return this.http.put<ClienteSistema>(`${this.apiUrl}/${id}`, cliente);
  }

  /**
   * Elimina un cliente por su ID.
   * @param id El ID del cliente a eliminar (number).
   * @returns Un Observable vacío (void) cuando la eliminación es exitosa.
   */
  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
