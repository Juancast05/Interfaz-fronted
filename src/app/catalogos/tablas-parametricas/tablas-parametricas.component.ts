import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface TablaParametrica {
  titulo: string;
  descripcion: string;
  ruta: string;
}

@Component({
  selector: 'app-tablas-parametricas',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './tablas-parametricas.component.html',
  styleUrl: './tablas-parametricas.component.css',
})
export class TablasParametricasComponent {
  tablas: TablaParametrica[] = [
    {
      titulo: 'Proveedores de Cámara',
      descripcion: 'Administra la lista de proveedores de cámaras.',
      ruta: 'proveedores-camara',
    },
    {
      titulo: 'Tipos de Cámara',
      descripcion: 'Administra los tipos de cámaras disponibles.',
      ruta: 'tipos-camara',
    },
    {
      titulo: 'Tipos de Tecnología',
      descripcion: 'Administra los tipos de tecnología de cámaras.',
      ruta: 'tipos-tecnologia',
    },
    {
      titulo: 'Tipos de Fuente de Evidencia',
      descripcion: 'Administra las fuentes de evidencia.',
      ruta: 'tipos-fuente-evidencia',
    },
  ];
}
