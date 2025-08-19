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

import { TipoMotivoExento } from '../../models/tipo_motivo_exento.model';
import { TipoMotivoExentoService } from '../../services/tipo-motivo-exento.service';

@Component({
  selector: 'app-tipo-motivo-exento-form',
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
  templateUrl: './tipo-motivo-exento-form.component.html',
  styleUrl: './tipo-motivo-exento-form.component.css',
})
export class TipoMotivoExentoFormComponent implements OnInit {
  tipoMotivoExentoForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoMotivoExentoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoMotivoExentoForm = this.fb.group({
      idTipoMotivoExento: [null],
      idClienteSistema: [null, Validators.required],
      codigoMotivo: ['', Validators.required],
      nombreMotivo: ['', Validators.required],
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
            this.tipoMotivoExentoForm.patchValue({
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
            this.router.navigate(['/catalogos/tipos-motivo-exento']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoMotivoExentoForm.valid) {
      const item: TipoMotivoExento = this.tipoMotivoExentoForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-motivo-exento']);
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
            this.router.navigate(['/catalogos/tipos-motivo-exento']);
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
      this.tipoMotivoExentoForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-motivo-exento']);
  }
}
