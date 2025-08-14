import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoEstadoSolicitud } from '../../models/tipo_estado_solicitud.model';
import { TipoEstadoSolicitudService } from '../../services/tipo-estado-solicitud.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-estado-solicitud-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './tipo-estado-solicitud-list.component.html',
  styleUrl: './tipo-estado-solicitud-list.component.css',
})
export class TipoEstadoSolicitudListComponent implements OnInit {
  estados: TipoEstadoSolicitud[] = [];
  displayedColumns: string[] = [
    'id_tipo_estado_solicitud',
    'nombre',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoEstadoSolicitudService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllEstados();
  }

  getAllEstados(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.estados = data;
        console.log('Datos cargados:', this.estados);
      },
      error: (e) => {
        console.error('Error al cargar los estados de solicitud', e);
        this.snackBar.open(
          'Error al cargar la lista de estados de solicitud.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteEstado(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de estado no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm('¿Estás seguro de que quieres eliminar este estado de solicitud?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Estado de solicitud eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllEstados();
        },
        error: (e) => {
          console.error('Error al eliminar el estado de solicitud', e);
          this.snackBar.open(
            'Error al eliminar el estado de solicitud.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addEstado(): void {
    this.router.navigate(['/catalogos/tipos-estado-solicitud/new']);
  }

  editEstado(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-estado-solicitud/edit', id]);
    } else {
      this.snackBar.open('ID de estado no válido para editar.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
