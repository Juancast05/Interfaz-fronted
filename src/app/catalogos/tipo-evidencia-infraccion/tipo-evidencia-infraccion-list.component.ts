import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoEvidenciaInfraccion } from '../../models/tipo_evidencia_infraccion.model';
import { TipoEvidenciaInfraccionService } from '../../services/tipo-evidencia-infraccion.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-evidencia-infraccion-list',
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
  templateUrl: './tipo-evidencia-infraccion-list.component.html',
  styleUrl: './tipo-evidencia-infraccion-list.component.css',
})
export class TipoEvidenciaInfraccionListComponent implements OnInit {
  evidenciasInfraccion: TipoEvidenciaInfraccion[] = [];
  displayedColumns: string[] = [
    'id_tipo_evidencia_infraccion',
    'id_tipo_codigo_infraccion',
    'id_tipo_evidencia',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoEvidenciaInfraccionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllEvidenciasInfraccion();
  }

  getAllEvidenciasInfraccion(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.evidenciasInfraccion = data;
        console.log('Datos cargados:', this.evidenciasInfraccion);
      },
      error: (e) => {
        console.error(
          'Error al cargar los tipos de evidencia de infracción',
          e
        );
        this.snackBar.open(
          'Error al cargar la lista de tipos de evidencia de infracción.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteEvidenciaInfraccion(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de evidencia de infracción no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm(
        '¿Estás seguro de que quieres eliminar este tipo de evidencia de infracción?'
      )
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de evidencia de infracción eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllEvidenciasInfraccion();
        },
        error: (e) => {
          console.error(
            'Error al eliminar el tipo de evidencia de infracción',
            e
          );
          this.snackBar.open(
            'Error al eliminar el tipo de evidencia de infracción.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addEvidenciaInfraccion(): void {
    this.router.navigate(['/catalogos/tipos-evidencia-infraccion/new']);
  }

  editEvidenciaInfraccion(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-evidencia-infraccion/edit', id]);
    } else {
      this.snackBar.open(
        'ID de evidencia de infracción no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
