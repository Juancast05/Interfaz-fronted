import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoCaracterPuntaje } from '../../models/tipo_caracter_puntaje.model';
import { TipoCaracterPuntajeService } from '../../services/tipo-caracter-puntaje.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-caracter-puntaje-list',
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
  templateUrl: './tipo-caracter-puntaje-list.component.html',
  styleUrl: './tipo-caracter-puntaje-list.component.css',
})
export class TipoCaracterPuntajeListComponent implements OnInit {
  tiposCaracterPuntaje: TipoCaracterPuntaje[] = [];
  displayedColumns: string[] = [
    'idTipoCaracterPuntaje',
    'caracter',
    'versionScore',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoCaracterPuntajeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTiposCaracterPuntaje();
  }

  getAllTiposCaracterPuntaje(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.tiposCaracterPuntaje = data;
        console.log('Datos cargados:', this.tiposCaracterPuntaje);
      },
      error: (e) => {
        console.error('Error al cargar la lista de puntajes de caracter', e);
        this.snackBar.open(
          'Error al cargar la lista de puntajes de caracter.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteTipoCaracterPuntaje(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de puntaje de caracter no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm('¿Estás seguro de que quieres eliminar este puntaje de caracter?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Puntaje de caracter eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllTiposCaracterPuntaje();
        },
        error: (e) => {
          console.error('Error al eliminar el puntaje de caracter', e);
          this.snackBar.open(
            'Error al eliminar el puntaje de caracter.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addTipoCaracterPuntaje(): void {
    this.router.navigate(['/catalogos/tipos-caracter-puntaje/new']);
  }

  editTipoCaracterPuntaje(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-caracter-puntaje/edit', id]);
    } else {
      this.snackBar.open(
        'ID de puntaje de caracter no válido para editar.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    }
  }
}
