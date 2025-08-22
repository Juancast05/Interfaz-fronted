import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoMotivoReenvio } from '../../models/tipo_motivo_reenvio.model';
import { TipoMotivoReenvioService } from '../../services/tipo-motivo-reenvio.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-motivo-reenvio-list',
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
  templateUrl: './tipo-motivo-reenvio-list.component.html',
  styleUrl: './tipo-motivo-reenvio-list.component.css',
})
export class TipoMotivoReenvioListComponent implements OnInit {
  motivosReenvio: TipoMotivoReenvio[] = [];
  displayedColumns: string[] = [
    'idTipoMotivoReenvio',
    'nombreMotivo',
    'fechaRegistro',
    'fechaInactiva',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoMotivoReenvioService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllMotivosReenvio();
  }

  getAllMotivosReenvio(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.motivosReenvio = data;
        console.log('Datos cargados:', this.motivosReenvio);
      },
      error: (e) => {
        console.error('Error al cargar la lista de motivos de reenvío', e);
        this.snackBar.open(
          'Error al cargar la lista de motivos de reenvío.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteMotivo(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de motivo de reenvío no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm('¿Estás seguro de que quieres eliminar este motivo de reenvío?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Motivo de reenvío eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllMotivosReenvio();
        },
        error: (e) => {
          console.error('Error al eliminar el motivo de reenvío', e);
          this.snackBar.open(
            'Error al eliminar el motivo de reenvío.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addMotivo(): void {
    this.router.navigate(['/catalogos/tipos-motivo-reenvio/new']);
  }

  editMotivo(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-motivo-reenvio/edit', id]);
    } else {
      this.snackBar.open(
        'ID de motivo de reenvío no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
