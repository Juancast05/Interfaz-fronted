import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoEvidencia } from '../../models/tipo_evidencia.model';
import { TipoEvidenciaService } from '../../services/tipo-evidencia.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-evidencia-list',
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
  templateUrl: './tipo-evidencia-list.component.html',
  styleUrl: './tipo-evidencia-list.component.css',
})
export class TipoEvidenciaListComponent implements OnInit {
  evidencias: TipoEvidencia[] = [];
  displayedColumns: string[] = [
    'id_tipo_evidencia',
    'nombre_evidencia',
    'tipo_evidencia',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoEvidenciaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllEvidencias();
  }

  getAllEvidencias(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.evidencias = data;
        console.log('Datos cargados:', this.evidencias);
      },
      error: (e) => {
        console.error('Error al cargar los tipos de evidencia', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos de evidencia.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteEvidencia(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de evidencia no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm('¿Estás seguro de que quieres eliminar este tipo de evidencia?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de evidencia eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllEvidencias();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de evidencia', e);
          this.snackBar.open(
            'Error al eliminar el tipo de evidencia.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addEvidencia(): void {
    this.router.navigate(['/catalogos/tipos-evidencia/new']);
  }

  editEvidencia(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-evidencia/edit', id]);
    } else {
      this.snackBar.open('ID de evidencia no válido para editar.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
