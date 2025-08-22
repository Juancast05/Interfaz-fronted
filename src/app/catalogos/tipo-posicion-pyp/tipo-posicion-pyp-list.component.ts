import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoPosicionPyp } from '../../models/tipo_posicion_pyp.model';
import { TipoPosicionPypService } from '../../services/tipo-posicion-pyp.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-posicion-pyp-list',
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
  templateUrl: './tipo-posicion-pyp-list.component.html',
  styleUrl: './tipo-posicion-pyp-list.component.css',
})
export class TipoPosicionPypListComponent implements OnInit {
  posicionesPyp: TipoPosicionPyp[] = [];
  displayedColumns: string[] = [
    'idTipoPosicion',
    'idClienteSistema',
    'idTipoFormatoPlaca',
    'posicionPyp',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoPosicionPypService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllPosicionesPyp();
  }

  getAllPosicionesPyp(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.posicionesPyp = data;
        console.log('Datos cargados:', this.posicionesPyp);
      },
      error: (e) => {
        console.error('Error al cargar la lista de posiciones Pyp', e);
        this.snackBar.open(
          'Error al cargar la lista de posiciones Pyp.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deletePosicion(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de posición Pyp no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta posición Pyp?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Posición Pyp eliminada exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.getAllPosicionesPyp();
        },
        error: (e) => {
          console.error('Error al eliminar la posición Pyp', e);
          this.snackBar.open('Error al eliminar la posición Pyp.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  addPosicion(): void {
    this.router.navigate(['/catalogos/tipos-posicion-pyp/new']);
  }

  editPosicion(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-posicion-pyp/edit', id]);
    } else {
      this.snackBar.open(
        'ID de posición Pyp no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
