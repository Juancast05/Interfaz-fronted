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
      titulo: 'Calendarios PYP',
      descripcion: 'Administra la lista de calendarios pyp.',
      ruta: 'tipos-calendario-pyp',
    },
    {
      titulo: 'Tipos de Clase de Vehículo',
      descripcion: 'Administra la lista de proveedores de cámaras.',
      ruta: 'tipos-clase-vehiculo',
    },
    {
      titulo: 'Tipos de Estado Evidencia',
      descripcion: 'Administra los tipos de estado de evidencia.',
      ruta: 'tipos-estado-evidencia',
    },
    {
      titulo: 'Tipos de Estado Reenvío',
      descripcion: 'Administra los tipos de estado de reenvio.',
      ruta: 'tipos-estado-reenvio',
    },
    {
      titulo: 'Tipos de Estado Solicitud',
      descripcion: 'Administra los tipo de estado de solicitud.',
      ruta: 'tipos-estado-solicitud',
    },
    {
      titulo: 'Tipos de Evidencia',
      descripcion: 'Administra los tipo de evidencia.',
      ruta: 'tipos-evidencia',
    },
  ];
}
