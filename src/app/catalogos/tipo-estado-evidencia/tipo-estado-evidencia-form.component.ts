import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { TipoEstadoEvidencia } from '../../models/tipo_estado_evidencia.model';
import { TipoEstadoEvidenciaService } from '../../services/tipo-estado-evidencia.service';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tipo-estado-evidencia-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './tipo-estado-evidencia-form.component.html',
  styleUrl: './tipo-estado-evidencia-form.component.css',
})
export class TipoEstadoEvidenciaFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  idToEdit: number | null = null;
  formTitle = 'Crear Tipo de Estado de Evidencia';

  constructor(
    private fb: FormBuilder,
    private service: TipoEstadoEvidenciaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      activo: [true],
      fechaRegistra: [{ value: '', disabled: true }], // Campo de solo lectura
      fechaInactiva: [{ value: '', disabled: true }], // Campo de solo lectura
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.idToEdit = +id;
        this.formTitle = 'Editar Tipo de Estado de Evidencia';
        this.service.getById(this.idToEdit).subscribe({
          next: (data) => {
            this.form.patchValue({
              nombre: data.nombre,
              activo: data.activo === 'S',
              fechaRegistra: data.fechaRegistra
                ? new Date(data.fechaRegistra).toISOString().substring(0, 10)
                : '',
              fechaInactiva: data.fechaInactiva
                ? new Date(data.fechaInactiva).toISOString().substring(0, 10)
                : '',
            });
          },
          error: (e) => {
            console.error(
              'Error al cargar el tipo de estado de evidencia para editar',
              e
            );
            this.snackBar.open('Error al cargar datos para editar.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open(
        'Por favor, completa todos los campos requeridos.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const data: TipoEstadoEvidencia = {
      ...this.form.value,
      activo: this.form.value.activo ? 'S' : 'N',
    };

    if (this.isEditMode && this.idToEdit) {
      this.service.update(this.idToEdit, data).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de estado de evidencia actualizado exitosamente',
            'Cerrar',
            { duration: 3000 }
          );
          this.router.navigate(['/catalogos/tipos-estado-evidencia']);
        },
        error: (e) => {
          console.error(
            'Error al actualizar el tipo de estado de evidencia',
            e
          );
          this.snackBar.open('Error al actualizar.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    } else {
      this.service.create(data).subscribe({
        next: () => {
          this.snackBar.open(
            'Tipo de estado de evidencia creado exitosamente',
            'Cerrar',
            { duration: 3000 }
          );
          this.router.navigate(['/catalogos/tipos-estado-evidencia']);
        },
        error: (e) => {
          console.error('Error al crear el tipo de estado de evidencia', e);
          this.snackBar.open('Error al crear.', 'Cerrar', { duration: 3000 });
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/catalogos/tipos-estado-evidencia']);
  }
}
