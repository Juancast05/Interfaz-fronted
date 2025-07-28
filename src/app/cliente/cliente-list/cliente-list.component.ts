// src/app/cliente/cliente-list/cliente-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { ClienteSistema } from '../../models/cliente-sistema.model';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; // Si lo usas en tu layout principal

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule, // Asegúrate de incluir todos los módulos que uses
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css',
})
export class ClienteListComponent implements OnInit {
  clientes: ClienteSistema[] = [];
  displayedColumns: string[] = [
    'id_cliente_sistema',
    'nombre',
    'ruta_base',
    'nodos',
    'activo',
    'acciones',
  ];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.getAllClientes();
  }

  getAllClientes(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        console.log('Clientes cargados:', this.clientes);
      },
      error: (error) => {
        console.error('Error al obtener clientes:', error);
      },
    });
  }

  editCliente(id_cliente_sistema: number): void {
    this.router.navigate(['/clientes/edit', id_cliente_sistema]);
  }

  deleteCliente(id_cliente_sistema: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clienteService.deleteCliente(id_cliente_sistema).subscribe({
        next: () => {
          console.log('Cliente eliminado exitosamente');
          this.getAllClientes();
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        },
      });
    }
  }

  addCliente(): void {
    this.router.navigate(['/clientes/new']);
  }
}
