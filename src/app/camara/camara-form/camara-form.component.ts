// src/app/camara/camara-form/camara-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'; // Usar ReactiveFormsModule y FormBuilder
import { Camara } from '../../models/camara.model';
import { ClienteSistema } from '../../models/cliente-sistema.model';
import { CamaraService } from '../../services/camara.service';
import { ClienteService } from '../../services/cliente.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // Para notificaciones
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Para iconos
import { MatExpansionModule } from '@angular/material/expansion'; // Para paneles de expansión

@Component({
  selector: 'app-camara-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Importar ReactiveFormsModule
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './camara-form.component.html',
  styleUrl: './camara-form.component.css',
})
export class CamaraFormComponent implements OnInit {
  camaraForm!: FormGroup; // Usaremos FormGroup
  isEditMode: boolean = false;
  camaraId: number | null = null; // Para guardar el ID en modo edición
  clientesSistema: ClienteSistema[] = [];

  constructor(
    private fb: FormBuilder, // Inyectar FormBuilder
    private camaraService: CamaraService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar // Para mostrar mensajes
  ) {}

  ngOnInit(): void {
    // Inicializar el formulario reactivo con todos los campos y validadores
    this.camaraForm = this.fb.group({
      id_cliente_sistema: [null, Validators.required], // Valor inicial null, requerido
      id_tipo_proveedor_camara: [null, Validators.min(0)],
      id_tipo_camara: [null, Validators.min(0)],
      id_tipo_tecnologia: [null, Validators.min(0)],
      index_code_proveedor: [''],
      codigo_camara: ['', Validators.required],
      codigo_equipo: [''],
      direccion: [''],
      maximocarril: [null, Validators.min(0)],
      fecha_calibracion: [''], // Mantener como string, el input date lo formateará
      serial_camara: [''],
      alias_camara: ['', Validators.required],
      id_usuario_registra: [null], // Puede ser null
      id_usuario_modifica: [null], // Puede ser null
      id_tipo_fuente_evidencia: [null, Validators.min(0)],
      latitud: [''],
      longitud: [''],
      activo: ['SI', Validators.required], // Valor por defecto 'SI'
      punto_Referencia_inicial: [''],
      punto_Referencia_final: [''],
      metros_referencia: [null, Validators.min(0)],
      velocidad_maxima_camara: [null, Validators.min(0)],
      tolerancia_permitida: [null, Validators.min(0)],
      resolucion_camara: [''],
    });

    this.loadClientesSistema(); // Cargar los clientes para el select

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.camaraId = +id; // Guardar el ID
        this.camaraService.getCamaraById(this.camaraId).subscribe({
          next: (data) => {
            // Ajustar el formato de fecha si viene con hora para que el input type="date" lo muestre correctamente
            if (data.fecha_calibracion) {
              data.fecha_calibracion = data.fecha_calibracion.split('T')[0];
            }
            this.camaraForm.patchValue(data); // Rellenar el formulario con los datos de la cámara
          },
          error: (e) => {
            console.error('Error al cargar cámara para edición', e);
            this.snackBar.open(
              'Error al cargar los datos de la cámara.',
              'Cerrar',
              { duration: 3000 }
            );
            this.router.navigate(['/camaras']);
          },
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

  onSubmit(): void {
    // Renombrado de saveCamara a onSubmit
    if (this.camaraForm.valid) {
      const camara: Camara = this.camaraForm.value;

      if (this.isEditMode && this.camaraId) {
        camara.id_info_camara = this.camaraId; // Asegurar que el ID esté en el objeto para actualizar
        this.camaraService.updateCamara(this.camaraId, camara).subscribe({
          next: () => {
            this.snackBar.open('Cámara actualizada exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/camaras']);
          },
          error: (e) => {
            console.error('Error al actualizar cámara', e);
            this.snackBar.open('Error al actualizar cámara.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      } else {
        // En modo creación, no se envía id_info_camara, el backend lo genera
        delete camara.id_info_camara;
        this.camaraService.createCamara(camara).subscribe({
          next: () => {
            this.snackBar.open('Cámara registrada exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/camaras']);
          },
          error: (e) => {
            console.error('Error al crear cámara', e);
            this.snackBar.open('Error al registrar cámara.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this.snackBar.open(
        'Por favor, completa todos los campos requeridos y válidos.',
        'Cerrar',
        { duration: 3000 }
      );
      this.camaraForm.markAllAsTouched(); // Marca todos los campos como "touched" para mostrar errores
    }
  }

  cancel(): void {
    // Método para el botón de cancelar
    this.router.navigate(['/camaras']);
  }
}
