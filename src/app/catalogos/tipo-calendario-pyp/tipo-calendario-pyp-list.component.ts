import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoCalendarioPyp } from '../../models/tipo_calendario_pyp.model';
import { TipoCalendarioPypService } from '../../services/tipo-calendario-pyp.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-calendario-pyp-list',
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
  templateUrl: './tipo-calendario-pyp-list.component.html',
  styleUrl: './tipo-calendario-pyp-list.component.css',
})
export class TipoCalendarioPypListComponent implements OnInit {
  calendarios: TipoCalendarioPyp[] = [];
  displayedColumns: string[] = [
    'id_tipo_calendario_pyp',
    'nombre',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoCalendarioPypService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCalendarios();
  }

  getAllCalendarios(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.calendarios = data;
        console.log('Datos cargados:', this.calendarios);
      },
      error: (e) => {
        console.error('Error al cargar los calendarios', e);
        this.snackBar.open(
          'Error al cargar la lista de calendarios.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteCalendario(id: number): void {
    // Nota: Aunque el HTML original usa routerLink, el ejemplo de cámara usa un método.
    // He mantenido la lógica de la función onDelete, renombrándola para mayor claridad.
    // Deberías usar un modal de confirmación en lugar de `window.confirm` en una aplicación real.
    if (confirm('¿Estás seguro de que quieres eliminar este calendario?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Calendario eliminado exitosamente', 'Cerrar', {
            duration: 3000,
          });
          this.getAllCalendarios();
        },
        error: (e) => {
          console.error('Error al eliminar el calendario', e);
          this.snackBar.open('Error al eliminar el calendario.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  addCalendario(): void {
    this.router.navigate(['/catalogos/tipos-calendario-pyp/new']);
  }

  editCalendario(id: number): void {
    this.router.navigate(['/catalogos/tipos-calendario-pyp/edit', id]);
  }
}
