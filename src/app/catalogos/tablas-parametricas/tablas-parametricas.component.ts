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
    {
      titulo: 'Tipos de Evidencia Infracción',
      descripcion: 'Administra los tipo de evidencia infracción.',
      ruta: 'tipos-evidencia-infraccion',
    },
    {
      titulo: 'Tipos de Exento',
      descripcion: 'Administra los tipo de exento.',
      ruta: 'tipos-exento',
    },
    {
      titulo: 'Tipos de Jornada Pyp',
      descripcion: 'Administra los tipos de jornadas Pyp.',
      ruta: 'tipos-jornada-pyp',
    },
    {
      titulo: 'Tipos de Motivo Exento',
      descripcion: 'Administra los tipos de motivos exentos.',
      ruta: 'tipos-motivo-exento',
    },
    {
      titulo: 'Tipos de Motivo Pyp',
      descripcion: 'Administra los tipos de motivos Pyp.',
      ruta: 'tipos-motivo-pyp',
    },
    {
      titulo: 'Tipos de Motivo Reenvío',
      descripcion: 'Administra los tipos de motivos de reenvío.',
      ruta: 'tipos-motivo-reenvio',
    },
    {
      titulo: 'Tipos de Posición Pyp',
      descripcion: 'Administra los tipos de posiciones Pyp.',
      ruta: 'tipos-posicion-pyp',
    },
    {
      titulo: 'Tipos de Proceso de Validación',
      descripcion: 'Administra los tipos de proceso y validaciones.',
      ruta: 'tipos-proceso-validacion',
    },
    {
      titulo: 'Tipos de Servicio',
      descripcion: 'Administra los tipos de servicio.',
      ruta: 'tipos-servicio',
    },
    {
      titulo: 'Tipos de Camara',
      descripcion: 'Administra los tipos de camara.',
      ruta: 'tipos-camara',
    },
    {
      titulo: 'Tipos de Caracter Puntaje',
      descripcion: 'Administra los tipos de caracter puntaje.',
      ruta: 'tipos-caracter-puntaje',
    },
  ];
}
