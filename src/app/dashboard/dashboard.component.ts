import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // Importar Router para navegación
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Camara } from '../models/camara.model';
import { ClienteSistema } from '../models/cliente-sistema.model';
import { CamaraService } from '../services/camara.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  camaras: Camara[] = [];
  clientes: ClienteSistema[] = [];
  filteredCamaras: Camara[] = [];
  filterForm: FormGroup;

  // Las columnas mostradas en la tabla del dashboard
  displayedColumns: string[] = [
    'alias_camara', // Usando alias_camara en lugar de 'nombre' genérico
    'codigo_camara', // Otro campo representativo
    'direccion',
    'activo', // Cambiado a 'activo'
    'cliente',
  ];

  constructor(
    private camaraService: CamaraService,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router // Inyectar Router para navegar a editar/eliminar
  ) {
    // Inicializar el formulario de filtros con los nombres de campo correctos
    this.filterForm = this.fb.group({
      id_cliente_sistema: [null], // Coincide con el campo en Camara y ClienteSistema
      activo: [null], // Coincide con el campo 'activo' en Camara
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadCamaras();
    this.setupFilterChanges();
  }

  loadCamaras(): void {
    this.camaraService.getAllCamaras().subscribe({
      next: (data) => {
        this.camaras = data;
        this.applyFilters(); // Aplicar filtros después de cargar las cámaras
      },
      error: (err) => {
        console.error('Error al cargar cámaras', err);
      },
    });
  }

  loadClientes(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
      },
    });
  }

  setupFilterChanges(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    // Desestructurar los valores del formulario usando los nombres correctos
    const { id_cliente_sistema, activo } = this.filterForm.value;

    this.filteredCamaras = this.camaras.filter((camara) => {
      let matchesCliente = true;
      let matchesActivo = true; // Cambiado a matchesActivo

      // Filtrar por cliente
      // Si se ha seleccionado un cliente (no es null) Y el id_cliente_sistema de la cámara no coincide
      if (
        id_cliente_sistema !== null &&
        camara.id_cliente_sistema !== id_cliente_sistema
      ) {
        matchesCliente = false;
      }

      // Filtrar por estado 'activo'
      // Si se ha seleccionado un estado (no es null)
      if (activo !== null) {
        // Asumiendo que camara.activo es un string 'SI' o 'NO'
        if (camara.activo) {
          // Asegurarse de que camara.activo no sea undefined/null
          matchesActivo = camara.activo.toLowerCase() === activo;
        } else {
          matchesActivo = false; // Si camara.activo es null/undefined, no coincide con ningún filtro de estado
        }
      }
      return matchesCliente && matchesActivo; // Combinar las condiciones
    });
  }

  // Método para obtener el nombre del cliente por su ID_CLIENTE_SISTEMA
  getClienteNombre(id_cliente_sistema: number | undefined): string {
    const cliente = this.clientes.find(
      (c) => c.id_cliente_sistema === id_cliente_sistema
    );
    return cliente ? cliente.nombre : 'N/A';
  }

  // Método para obtener la clase de estado (para estilos visuales)
  getEstadoClass(activo: string | undefined): string {
    if (activo) {
      return activo.toLowerCase() === 'si'
        ? 'estado-activo'
        : 'estado-inactivo';
    }
    return '';
  }

  // Métodos para navegar a editar/eliminar (si quieres que los botones estén en el dashboard)
  editCamara(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/camaras/edit', id]);
    }
  }

  deleteCamara(id: number | undefined): void {
    if (
      id !== undefined &&
      confirm('¿Estás seguro de que quieres eliminar esta cámara?')
    ) {
      this.camaraService.deleteCamara(id).subscribe({
        next: () => {
          console.log(`Cámara con ID ${id} eliminada desde el dashboard.`);
          this.loadCamaras(); // Recargar cámaras para actualizar la lista filtrada
        },
        error: (e) =>
          console.error('Error al eliminar cámara desde el dashboard', e),
      });
    }
  }
}
