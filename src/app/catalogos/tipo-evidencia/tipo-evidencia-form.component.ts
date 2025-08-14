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

import { TipoEvidencia } from '../../models/tipo_evidencia.model';
import { TipoEvidenciaService } from '../../services/tipo-evidencia.service';

@Component({
  selector: 'app-tipo-evidencia-form',
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
  templateUrl: './tipo-evidencia-form.component.html',
  styleUrl: './tipo-evidencia-form.component.css',
})
export class TipoEvidenciaFormComponent implements OnInit {
  tipoEvidenciaForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoEvidenciaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoEvidenciaForm = this.fb.group({
      idTipoEvidencia: [null],
      nombreEvidencia: ['', Validators.required],
      tipoEvidencia: ['', Validators.required],
      fechaRegistra: [null],
      activo: ['SI', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.itemId = +id;
        this.service.getById(this.itemId).subscribe({
          next: (data) => this.tipoEvidenciaForm.patchValue(data),
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-evidencia']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoEvidenciaForm.valid) {
      const item: TipoEvidencia = this.tipoEvidenciaForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-evidencia']);
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
            this.router.navigate(['/catalogos/tipos-evidencia']);
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
      this.tipoEvidenciaForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-evidencia']);
  }
}
