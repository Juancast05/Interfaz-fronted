import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoMotivoPyp } from '../../models/tipo_motivo_pyp.model';
import { TipoMotivoPypService } from '../../services/tipo-motivo-pyp.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-motivo-pyp-list',
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
  templateUrl: './tipo-motivo-pyp-list.component.html',
  styleUrl: './tipo-motivo-pyp-list.component.css',
})
export class TipoMotivoPypListComponent implements OnInit {
  motivosPyp: TipoMotivoPyp[] = [];
  displayedColumns: string[] = [
    'idTipoMotivoPyp',
    'nombre',
    'descripcion',
    'prioridad',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoMotivoPypService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllMotivosPyp();
  }

  getAllMotivosPyp(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.motivosPyp = data;
        console.log('Datos cargados:', this.motivosPyp);
      },
      error: (e) => {
        console.error('Error al cargar la lista de motivos Pyp', e);
        this.snackBar.open(
          'Error al cargar la lista de motivos Pyp.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteMotivo(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de motivo Pyp no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este motivo Pyp?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Motivo Pyp eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.getAllMotivosPyp();
        },
        error: (e) => {
          console.error('Error al eliminar el motivo Pyp', e);
          this.snackBar.open('Error al eliminar el motivo Pyp.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  addMotivo(): void {
    this.router.navigate(['/catalogos/tipos-motivo-pyp/new']);
  }

  editMotivo(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-motivo-pyp/edit', id]);
    } else {
      this.snackBar.open('ID de motivo Pyp no válido para editar.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
