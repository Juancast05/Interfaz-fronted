import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoEstadoEvidencia } from '../../models/tipo_estado_evidencia.model';
import { TipoEstadoEvidenciaService } from '../../services/tipo-estado-evidencia.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-estado-evidencia-list',
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
  templateUrl: './tipo-estado-evidencia-list.component.html',
  styleUrl: './tipo-estado-evidencia-list.component.css',
})
export class TipoEstadoEvidenciaListComponent implements OnInit {
  tiposEstadoEvidencia: TipoEstadoEvidencia[] = [];
  displayedColumns: string[] = [
    'idTipoEstadoEvidencia',
    'nombre',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoEstadoEvidenciaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTiposEstadoEvidencia();
  }

  getAllTiposEstadoEvidencia(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
        this.tiposEstadoEvidencia = data;
      },
      error: (e) => {
        console.error('Error al cargar los tipos de estado de evidencia', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos de estado de evidencia.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteTipoEstadoEvidencia(id: number | undefined): void {
    if (id === undefined) {
      console.error(
        'ID de tipo de estado de evidencia no definido para eliminar'
      );
      return;
    }
    if (
      confirm(
        '¿Estás seguro de que quieres eliminar este tipo de estado de evidencia?'
      )
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de estado de evidencia eliminado exitosamente',
            'Cerrar',
            { duration: 3000 }
          );
          this.getAllTiposEstadoEvidencia();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de estado de evidencia', e);
          this.snackBar.open(
            'Error al eliminar el tipo de estado de evidencia.',
            'Cerrar',
            { duration: 3000 }
          );
        },
      });
    }
  }

  addTipoEstadoEvidencia(): void {
    this.router.navigate(['/catalogos/tipos-estado-evidencia/new']);
  }

  editTipoEstadoEvidencia(id: number | undefined): void {
    if (id === undefined) {
      console.error(
        'ID de tipo de estado de evidencia no definido para editar'
      );
      return;
    }
    this.router.navigate(['/catalogos/tipos-estado-evidencia/edit', id]);
  }
}
