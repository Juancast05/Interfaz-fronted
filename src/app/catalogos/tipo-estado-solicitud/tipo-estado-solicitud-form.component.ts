import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { TipoEstadoSolicitud } from '../../models/tipo_estado_solicitud.model';
import { TipoEstadoSolicitudService } from '../../services/tipo-estado-solicitud.service';

@Component({
  selector: 'app-tipo-estado-solicitud-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  templateUrl: './tipo-estado-solicitud-form.component.html',
  styleUrl: './tipo-estado-solicitud-form.component.css',
})
export class TipoEstadoSolicitudFormComponent implements OnInit {
  tipoEstadoSolicitudForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoEstadoSolicitudService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoEstadoSolicitudForm = this.fb.group({
      idTipoEstadoSolicitud: [null],
      nombre: ['', Validators.required],
      fechaRegistra: [null],
      fechaInactiva: [null],
      activo: ['SI', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.itemId = +id;
        this.service.getById(this.itemId).subscribe({
          next: (data) => this.tipoEstadoSolicitudForm.patchValue(data),
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-estado-solicitud']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoEstadoSolicitudForm.valid) {
      const item: TipoEstadoSolicitud = this.tipoEstadoSolicitudForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-estado-solicitud']);
          },
          error: (e) => {
            console.error('Error al actualizar registro', e);
            this.snackBar.open('Error al actualizar el registro.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      } else {
        this.service.create(item).subscribe({
          next: () => {
            this.snackBar.open('Registro creado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-estado-solicitud']);
          },
          error: (e) => {
            console.error('Error al crear registro', e);
            this.snackBar.open('Error al crear el registro.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this.snackBar.open(
        'Por favor, completa todos los campos requeridos.',
        'Cerrar',
        { duration: 3000 }
      );
      this.tipoEstadoSolicitudForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-estado-solicitud']);
  }
}
