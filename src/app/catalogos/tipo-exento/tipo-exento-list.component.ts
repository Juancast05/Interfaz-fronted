import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoExento } from '../../models/tipo_exento.model';
import { TipoExentoService } from '../../services/tipo-exento.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-exento-list',
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
  templateUrl: './tipo-exento-list.component.html',
  styleUrl: './tipo-exento-list.component.css',
})
export class TipoExentoListComponent implements OnInit {
  exentos: TipoExento[] = [];
  displayedColumns: string[] = [
    'idTipoExento',
    'idClienteSistema',
    'codigoExento',
    'descripcionExento',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoExentoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllExentos();
  }

  getAllExentos(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.exentos = data;
        console.log('Datos cargados:', this.exentos);
      },
      error: (e) => {
        console.error('Error al cargar la lista de tipos exentos', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos exentos.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteExento(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de tipo exento no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este tipo exento?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Tipo exento eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.getAllExentos();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo exento', e);
          this.snackBar.open('Error al eliminar el tipo exento.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  addExento(): void {
    this.router.navigate(['/catalogos/tipos-exento/new']);
  }

  editExento(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-exento/edit', id]);
    } else {
      this.snackBar.open('ID de tipo exento no válido para editar.', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
