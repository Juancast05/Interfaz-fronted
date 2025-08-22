import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoProcesoValidacion } from '../../models/tipo_proceso_validacion.model';
import { TipoProcesoValidacionService } from '../../services/tipo-proceso-validacion.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-proceso-validacion-list',
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
  templateUrl: './tipo-proceso-validacion-list.component.html',
  styleUrl: './tipo-proceso-validacion-list.component.css',
})
export class TipoProcesoValidacionListComponent implements OnInit {
  procesosValidacion: TipoProcesoValidacion[] = [];
  displayedColumns: string[] = [
    'idTipoProcesoValidacion',
    'idClienteSistema',
    'nombre',
    'idTipoCodigoInfraccion',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoProcesoValidacionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProcesosValidacion();
  }

  getAllProcesosValidacion(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.procesosValidacion = data;
        console.log('Datos cargados:', this.procesosValidacion);
      },
      error: (e) => {
        console.error('Error al cargar la lista de procesos de validación', e);
        this.snackBar.open(
          'Error al cargar la lista de procesos de validación.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteProceso(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de proceso de validación no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm(
        '¿Estás seguro de que quieres eliminar este proceso de validación?'
      )
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Proceso de validación eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllProcesosValidacion();
        },
        error: (e) => {
          console.error('Error al eliminar el proceso de validación', e);
          this.snackBar.open(
            'Error al eliminar el proceso de validación.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addProceso(): void {
    this.router.navigate(['/catalogos/tipos-proceso-validacion/new']);
  }

  editProceso(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-proceso-validacion/edit', id]);
    } else {
      this.snackBar.open(
        'ID de proceso de validación no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
