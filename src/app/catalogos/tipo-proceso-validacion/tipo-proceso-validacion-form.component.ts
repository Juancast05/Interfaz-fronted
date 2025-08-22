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

import { TipoProcesoValidacion } from '../../models/tipo_proceso_validacion.model';
import { TipoProcesoValidacionService } from '../../services/tipo-proceso-validacion.service';

@Component({
  selector: 'app-tipo-proceso-validacion-form',
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
  templateUrl: './tipo-proceso-validacion-form.component.html',
  styleUrl: './tipo-proceso-validacion-form.component.css',
})
export class TipoProcesoValidacionFormComponent implements OnInit {
  tipoProcesoValidacionForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoProcesoValidacionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoProcesoValidacionForm = this.fb.group({
      idTipoProcesoValidacion: [null],
      idClienteSistema: [null, Validators.required],
      nombre: ['', Validators.required],
      idTipoCodigoInfraccion: [null, Validators.required],
      maximoReporteDetecciones: [null],
      diasReporteDeteccion: [null],
      diasHabilesReporteDeteccion: ['NO', Validators.required],
      diasGestionEntrega: [null],
      diasHabilesGestionEntrega: ['NO', Validators.required],
      minimoImagenesReporte: [null],
      validaExento: [null],
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
          next: (data) => {
            const fechaRegistra = data.fechaRegistra
              ? new Date(data.fechaRegistra)
              : null;
            const fechaInactiva = data.fechaInactiva
              ? new Date(data.fechaInactiva)
              : null;
            this.tipoProcesoValidacionForm.patchValue({
              ...data,
              fechaRegistra,
              fechaInactiva,
            });
          },
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-proceso-validacion']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoProcesoValidacionForm.valid) {
      const item: TipoProcesoValidacion = this.tipoProcesoValidacionForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-proceso-validacion']);
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
            this.router.navigate(['/catalogos/tipos-proceso-validacion']);
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
      this.tipoProcesoValidacionForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-proceso-validacion']);
  }
}
