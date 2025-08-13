import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { TipoClaseVehiculo } from '../../models/tipo_clase_vehiculo.model';
import { TipoClaseVehiculoService } from '../../services/tipo-clase-vehiculo.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-clase-vehiculo-list',
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
  templateUrl: './tipo-clase-vehiculo-list.component.html',
  styleUrl: './tipo-clase-vehiculo-list.component.css',
})
export class TipoClaseVehiculoListComponent implements OnInit {
  tiposClaseVehiculo: TipoClaseVehiculo[] = [];
  displayedColumns: string[] = [
    'idTipoClaseVehiculo',
    'idClienteSistema',
    'codigoClasificacion',
    'nombre',
    'activo',
    'acciones',
  ];

  constructor(
    private service: TipoClaseVehiculoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllTiposClaseVehiculo();
  }

  getAllTiposClaseVehiculo(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('Datos cargados:', data);
        this.tiposClaseVehiculo = data;
      },
      error: (e) => {
        console.error('Error al cargar los tipos de clase de vehículo', e);
        this.snackBar.open(
          'Error al cargar la lista de tipos de clase de vehículo.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }

  deleteTipoClaseVehiculo(id: number): void {
    if (
      confirm(
        '¿Estás seguro de que quieres eliminar este tipo de clase de vehículo?'
      )
    ) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de clase de vehículo eliminado exitosamente',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.getAllTiposClaseVehiculo();
        },
        error: (e) => {
          console.error('Error al eliminar el tipo de clase de vehículo', e);
          this.snackBar.open(
            'Error al eliminar el tipo de clase de vehículo.',
            'Cerrar',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  addTipoClaseVehiculo(): void {
    this.router.navigate(['/catalogos/tipos-clase-vehiculo/new']);
  }

  editTipoClaseVehiculo(id: number): void {
    this.router.navigate(['/catalogos/tipos-clase-vehiculo/edit', id]);
  }
}
