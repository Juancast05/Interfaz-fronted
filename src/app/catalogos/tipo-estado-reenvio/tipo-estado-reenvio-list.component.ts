import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoEstadoReenvio } from '../../models/tipo_estado_reenvio.model';
import { TipoEstadoReenvioService } from '../../services/tipo-estado-reenvio.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-estado-reenvio-list',
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
  templateUrl: './tipo-estado-reenvio-list.component.html',
  styleUrl: './tipo-estado-reenvio-list.component.css',
})
export class TipoEstadoReenvioListComponent implements OnInit {
  estados: TipoEstadoReenvio[] = [];
  displayedColumns: string[] = [
    'id_tipo_estado_reenvio',
    'nombre',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoEstadoReenvioService,
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
        console.error('Error al cargar los estados de reenvío', e);
        this.snackBar.open(
          'Error al cargar la lista de estados de reenvío.',
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
      confirm('¿Estás seguro de que quieres eliminar este estado de reenvío?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Estado de reenvío eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllEstados();
        },
        error: (e) => {
          console.error('Error al eliminar el estado de reenvío', e);
          this.snackBar.open(
            'Error al eliminar el estado de reenvío.',
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
    this.router.navigate(['/catalogos/tipos-estado-reenvio/new']);
  }

  editEstado(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-estado-reenvio/edit', id]);
    } else {
      this.snackBar.open('ID de estado no válido para editar.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
