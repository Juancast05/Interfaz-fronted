import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoCamara } from '../../models/tipo_camara.model';
import { TipoCamaraService } from '../../services/tipo-camara.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-camara-list',
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
  templateUrl: './tipo-camara-list.component.html',
  styleUrl: './tipo-camara-list.component.css',
})
export class TipoCamaraListComponent implements OnInit {
  tiposCamara: TipoCamara[] = [];
  displayedColumns: string[] = ['idTipoCamara', 'nombre', 'activo', 'acciones'];

  constructor(
    private service: TipoCamaraService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTiposCamara();
  }

  getAllTiposCamara(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        // Asignar los datos recibidos a la propiedad tiposCamara
        this.tiposCamara = data;
        console.log('Datos cargados:', this.tiposCamara);
      },
      error: (e) => {
        console.error('Error al cargar la lista de tipos de cámara', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos de cámara.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteTipoCamara(id: number | undefined): void {
    if (id === undefined) {
      this.snackBar.open('ID de tipo de cámara no válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este tipo de cámara?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de cámara eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllTiposCamara();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de cámara', e);
          this.snackBar.open('Error al eliminar el tipo de cámara.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  addTipoCamara(): void {
    this.router.navigate(['/catalogos/tipos-camara/new']);
  }

  editTipoCamara(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/catalogos/tipos-camara/edit', id]);
    } else {
      this.snackBar.open(
        'ID de tipo de cámara no válido para editar.',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }
}
