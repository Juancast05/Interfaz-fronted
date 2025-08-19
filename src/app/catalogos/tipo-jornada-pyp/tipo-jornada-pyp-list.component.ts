import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoJornadaPyp } from '../../models/tipo_jornada_pyp.model';
import { TipoJornadaPypService } from '../../services/tipo-jornada-pyp.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-jornada-pyp-list',
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
  templateUrl: './tipo-jornada-pyp-list.component.html',
  styleUrl: './tipo-jornada-pyp-list.component.css',
})
export class TipoJornadaPypListComponent implements OnInit {
  jornadasPyp: TipoJornadaPyp[] = [];
  displayedColumns: string[] = [
    'idTipoJornadaPyp',
    'nombre',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoJornadaPypService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllJornadasPyp();
  }

  getAllJornadasPyp(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.jornadasPyp = data;
        console.log('Datos cargados:', this.jornadasPyp);
      },
      error: (e) => {
        console.error('Error al cargar la lista de tipos de jornada Pyp', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos de jornada Pyp.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteJornada(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de tipo de jornada no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (
      confirm('¿Estás seguro de que quieres eliminar este tipo de jornada?')
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de jornada eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllJornadasPyp();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de jornada', e);
          this.snackBar.open(
            'Error al eliminar el tipo de jornada.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addJornada(): void {
    this.router.navigate(['/catalogos/tipos-jornada-pyp/new']);
  }

  editJornada(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-jornada-pyp/edit', id]);
    } else {
      this.snackBar.open(
        'ID de tipo de jornada no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
