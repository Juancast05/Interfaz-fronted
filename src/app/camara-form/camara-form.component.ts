// src/app/camara-form/camara-form.component.ts
// Asegúrate de que las rutas a 'models' y 'services' sean correctas (deberían ser '../models/...' y '../services/...')
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Camara } from '../models/camara.model';
import { ClienteSistema } from '../models/cliente-sistema.model';
import { CamaraService } from '../services/camara.service';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-camara-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './camara-form.component.html',
  styleUrl: './camara-form.component.css',
})
export class CamaraFormComponent implements OnInit {
  camara: Camara = {
    id_cliente_sistema: 0,
    id_tipo_proveedor_camara: 0,
    id_tipo_camara: 0,
    id_tipo_tecnologia: 0,
    index_code_proveedor: '',
    codigo_camara: '',
    codigo_equipo: '',
    direccion: '',
    maximocarril: 0,
    fecha_calibracion: '',
    serial_camara: '',
    alias_camara: '',
    id_usuario_registra: 0,
    id_usuario_modifica: 0,
    id_tipo_fuente_evidencia: 0,
    latitud: '',
    longitud: '',
    activo: '',
    punto_Referencia_inicial: '',
    punto_Referencia_final: '',
    metros_referencia: 0,
    velocidad_maxima_camara: 0,
    tolerancia_permitida: 0,
    resolucion_camara: '',
  };
  isEditMode: boolean = false;
  clientesSistema: ClienteSistema[] = [];

  constructor(
    private camaraService: CamaraService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientesSistema();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.camaraService.getCamaraById(+id).subscribe({
          next: (data) => {
            this.camara = data;
            if (this.camara.fecha_calibracion) {
              this.camara.fecha_calibracion =
                this.camara.fecha_calibracion.split('T')[0];
            }
          },
          error: (e) => console.error('Error al cargar cámara para edición', e),
        });
      }
    });
  }

  loadClientesSistema(): void {
    this.clienteService.getAllClientes().subscribe({
      next: (data) => {
        this.clientesSistema = data;
        console.log('Clientes Sistema cargados:', this.clientesSistema);
      },
      error: (e) => console.error('Error al cargar clientes sistema', e),
    });
  }

  saveCamara(): void {
    if (this.isEditMode) {
      if (this.camara.id_info_camara) {
        this.camaraService
          .updateCamara(this.camara.id_info_camara, this.camara)
          .subscribe({
            next: () => {
              console.log('Cámara actualizada con éxito.');
              this.router.navigate(['/camaras']);
            },
            error: (e) => console.error('Error al actualizar cámara', e),
          });
      } else {
        console.error('ID de cámara no disponible para actualizar.');
      }
    } else {
      this.camaraService.createCamara(this.camara).subscribe({
        next: () => {
          console.log('Cámara creada con éxito.');
          this.router.navigate(['/camaras']);
        },
        error: (e) => console.error('Error al crear cámara', e),
      });
    }
  }

  onDateChange(
    event: Event,
    field: 'fecha_calibracion' | 'fecha_registra' | 'fecha_modifica'
  ): void {
    const inputElement = event.target as HTMLInputElement;
    this.camara[field] = inputElement.value;
  }
}
