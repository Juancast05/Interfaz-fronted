// src/app/camara/camara-dashboard/camara-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// *** ¡¡RUTAS CORREGIDAS AQUI!! ***
// Subimos dos niveles (../ de camara-dashboard/ a camara/, y ../ de camara/ a app/)
// Luego bajamos al componente que está directamente en app/
import { CamaraFormComponent } from '../camara-form/camara-form.component';
import { CamaraListComponent } from '../camara-list/camara-list.component';

import { ClienteSistema } from '../models/cliente-sistema.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-camara-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CamaraFormComponent, // Usamos el formulario aquí
    CamaraListComponent, // Usamos la lista aquí
  ],
  templateUrl: './camara-dashboard.component.html', // Estas rutas locales son correctas si los archivos están en la misma carpeta
  styleUrl: './camara-dashboard.component.css',
})
export class CamaraDashboardComponent implements OnInit {
  // ... tu código ...
  estadoCamaraFiltro: string = 'Todas'; // Valor por defecto
  clienteFiltro: number = 0; // 0 para "Todos" o ID del cliente
  clientesSistema: ClienteSistema[] = []; // Lista de clientes para el dropdown del filtro

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientesSistemaForFilter();
  }

  loadClientesSistemaForFilter(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (data) => {
        this.clientesSistema = data;
        console.log(
          'Clientes Sistema cargados para filtro:',
          this.clientesSistema
        );
      },
      error: (e) =>
        console.error('Error al cargar clientes sistema para filtro', e),
    });
  }

  aplicarFiltros(): void {
    console.log('Filtros aplicados:', {
      estado: this.estadoCamaraFiltro,
      cliente: this.clienteFiltro,
    });
  }
}
