// src/app/camara-list/camara-list.component.ts
// Asegúrate de que las rutas a 'models' y 'services' sean correctas (deberían ser '../models/...' y '../services/...')
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Camara } from '../models/camara.model';
import { CamaraService } from '../services/camara.service';

@Component({
  selector: 'app-camara-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './camara-list.component.html',
  styleUrl: './camara-list.component.css',
})
export class CamaraListComponent implements OnInit {
  camaras: Camara[] = [];

  constructor(private camaraService: CamaraService) {}

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
          this.getAllCamaras();
        },
        error: (e) => console.error('Error al eliminar cámara', e),
      });
    }
  }
}
