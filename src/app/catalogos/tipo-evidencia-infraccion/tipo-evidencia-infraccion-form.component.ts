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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { TipoEvidenciaInfraccion } from '../../models/tipo_evidencia_infraccion.model';
import { TipoEvidenciaInfraccionService } from '../../services/tipo-evidencia-infraccion.service';

@Component({
  selector: 'app-tipo-evidencia-infraccion-form',
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
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './tipo-evidencia-infraccion-form.component.html',
  styleUrl: './tipo-evidencia-infraccion-form.component.css',
})
export class TipoEvidenciaInfraccionFormComponent implements OnInit {
  tipoEvidenciaInfraccionForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoEvidenciaInfraccionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoEvidenciaInfraccionForm = this.fb.group({
      idTipoEvidenciaInfraccion: [null],
      idTipoCodigoInfraccion: [null, Validators.required],
      idTipoEvidencia: [null, Validators.required],
      fechaInicio: [null],
      fechaFin: [null],
      activo: ['SI', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.itemId = +id;
        this.service.getById(this.itemId).subscribe({
          next: (data) => {
            // Aseguramos que las fechas sean objetos Date o null antes de asignarlas al formulario.
            // Si el valor del API es null, lo mantenemos como null. Si es una fecha válida, la convertimos.
            const fechaInicio = data.fechaInicio
              ? new Date(data.fechaInicio)
              : null;
            const fechaFin = data.fechaFin ? new Date(data.fechaFin) : null;
            this.tipoEvidenciaInfraccionForm.patchValue({
              ...data,
              fechaInicio,
              fechaFin,
            });
          },
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-evidencia-infraccion']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoEvidenciaInfraccionForm.valid) {
      const item: TipoEvidenciaInfraccion =
        this.tipoEvidenciaInfraccionForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-evidencia-infraccion']);
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
            this.router.navigate(['/catalogos/tipos-evidencia-infraccion']);
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
      this.tipoEvidenciaInfraccionForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-evidencia-infraccion']);
  }
}
