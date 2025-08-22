import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoServicio } from '../../models/tipo_servicio.model';
import { TipoServicioService } from '../../services/tipo-servicio.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-servicio-list',
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
  templateUrl: './tipo-servicio-list.component.html',
  styleUrl: './tipo-servicio-list.component.css',
})
export class TipoServicioListComponent implements OnInit {
  tiposServicio: TipoServicio[] = [];
  displayedColumns: string[] = [
    'idTipoServicio',
    'idClienteSistema',
    'nombre',
    'codigoServicio',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoServicioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTiposServicio();
  }

  getAllTiposServicio(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.tiposServicio = data;
        console.log('Datos cargados:', this.tiposServicio);
      },
      error: (e) => {
        console.error('Error al cargar la lista de tipos de servicio', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos de servicio.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteTipoServicio(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de tipo de servicio no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm('¿Estás seguro de que quieres eliminar este tipo de servicio?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de servicio eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllTiposServicio();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de servicio', e);
          this.snackBar.open(
            'Error al eliminar el tipo de servicio.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addTipoServicio(): void {
    this.router.navigate(['/catalogos/tipos-servicio/new']);
  }

  editTipoServicio(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-servicio/edit', id]);
    } else {
      this.snackBar.open(
        'ID de tipo de servicio no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
