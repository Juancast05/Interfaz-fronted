// src/app/camara/camara-list/camara-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Asegúrate de que Router esté importado
import { Camara } from '../../models/camara.model';
import { CamaraService } from '../../services/camara.service';

// Angular Material Imports
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// Si usas MatToolbar en el navbar principal, no necesitas importarlo aquí necesariamente

@Component({
  selector: 'app-camara-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './camara-list.component.html',
  styleUrl: './camara-list.component.css',
})
export class CamaraListComponent implements OnInit {
  camaras: Camara[] = [];
  // Define las columnas que se mostrarán en la tabla de Material
  displayedColumns: string[] = [
    'id_info_camara',
    'alias_camara',
    'codigo_camara',
    'direccion',
    'serial_camara',
    'activo',
    'acciones',
  ];

  constructor(private camaraService: CamaraService, private router: Router) {} // Inyecta Router para navegación

  ngOnInit(): void {
    this.getAllCamaras();
  }

  getAllCamaras(): void {
    this.camaraService.getAllCamaras().subscribe({
      next: (data) => {
        this.camaras = data;
        console.log('Cámaras cargadas:', this.camaras);
      },
      error: (e) => console.error('Error al cargar cámaras', e),
    });
  }

  deleteCamara(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID de cámara no definido para eliminar');
      return;
    }
    if (confirm('¿Estás seguro de que quieres eliminar esta cámara?')) {
      this.camaraService.deleteCamara(id).subscribe({
        next: () => {
          console.log(`Cámara con ID ${id} eliminada.`);
          this.getAllCamaras(); // Refrescar la lista
        },
        error: (e) => console.error('Error al eliminar cámara', e),
      });
    }
  }

  // Método para el botón "Crear Nueva Cámara"
  addCamara(): void {
    this.router.navigate(['/camaras/new']);
  }

  editCamara(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID de cámara no definido para editar');
      return;
    }
    this.router.navigate(['/camaras/edit', id]);
  }
}
