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

import { TipoEstadoReenvio } from '../../models/tipo_estado_reenvio.model';
import { TipoEstadoReenvioService } from '../../services/tipo-estado-reenvio.service';

@Component({
  selector: 'app-tipo-estado-reenvio-form',
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
  templateUrl: './tipo-estado-reenvio-form.component.html',
  styleUrl: './tipo-estado-reenvio-form.component.css',
})
export class TipoEstadoReenvioFormComponent implements OnInit {
  tipoEstadoReenvioForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoEstadoReenvioService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoEstadoReenvioForm = this.fb.group({
      idTipoEstadoReenvio: [null],
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
          next: (data) => this.tipoEstadoReenvioForm.patchValue(data),
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-estado-reenvio']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoEstadoReenvioForm.valid) {
      const item: TipoEstadoReenvio = this.tipoEstadoReenvioForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-estado-reenvio']);
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
            this.router.navigate(['/catalogos/tipos-estado-reenvio']);
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
      this.tipoEstadoReenvioForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-estado-reenvio']);
  }
}
