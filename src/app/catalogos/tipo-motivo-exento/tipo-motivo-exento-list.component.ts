import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoMotivoExento } from '../../models/tipo_motivo_exento.model';
import { TipoMotivoExentoService } from '../../services/tipo-motivo-exento.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-motivo-exento-list',
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
  templateUrl: './tipo-motivo-exento-list.component.html',
  styleUrl: './tipo-motivo-exento-list.component.css',
})
export class TipoMotivoExentoListComponent implements OnInit {
  motivosExento: TipoMotivoExento[] = [];
  displayedColumns: string[] = [
    'idTipoMotivoExento',
    'idClienteSistema',
    'codigoMotivo',
    'nombreMotivo',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoMotivoExentoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllMotivosExento();
  }

  getAllMotivosExento(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.motivosExento = data;
        console.log('Datos cargados:', this.motivosExento);
      },
      error: (e) => {
        console.error('Error al cargar la lista de motivos exento', e);
        this.snackBar.open(
          'Error al cargar la lista de motivos exento.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteMotivo(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de motivo exento no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este motivo exento?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Motivo exento eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.getAllMotivosExento();
        },
        error: (e) => {
          console.error('Error al eliminar el motivo exento', e);
          this.snackBar.open('Error al eliminar el motivo exento.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  addMotivo(): void {
    this.router.navigate(['/catalogos/tipos-motivo-exento/new']);
  }

  editMotivo(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-motivo-exento/edit', id]);
    } else {
      this.snackBar.open(
        'ID de motivo exento no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
