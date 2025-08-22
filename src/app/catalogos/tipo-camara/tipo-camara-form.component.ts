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

import { TipoCamara } from '../../models/tipo_camara.model';
import { TipoCamaraService } from '../../services/tipo-camara.service';

@Component({
  selector: 'app-tipo-camara-form',
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
  templateUrl: './tipo-camara-form.component.html',
  styleUrl: './tipo-camara-form.component.css',
})
export class TipoCamaraFormComponent implements OnInit {
  tipoCamaraForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoCamaraService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoCamaraForm = this.fb.group({
      idTipoCamara: [null],
      nombre: ['', Validators.required],
      fechaRegistra: [null],
      fechaInactiva: [null],
      activo: ['S', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.itemId = +id;
        this.service.getById(this.itemId).subscribe({
          next: (data) => {
            // Se corrige la inicialización del formulario para los campos de fecha
            // El API retorna la fecha como string, el formulario espera un objeto Date
            const fechaRegistra = data.fechaRegistra
              ? new Date(data.fechaRegistra)
              : null;
            const fechaInactiva = data.fechaInactiva
              ? new Date(data.fechaInactiva)
              : null;
            this.tipoCamaraForm.patchValue({
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
            this.router.navigate(['/catalogos/tipos-camara']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoCamaraForm.valid) {
      const formValues = this.tipoCamaraForm.value;

      // Creamos un objeto para enviar a la API con las fechas en formato string
      const requestBody = {
        ...formValues,
      };

      // Ajuste para formatear las fechas a cadenas ISO antes de enviar
      if (formValues.fechaRegistra) {
        requestBody.fechaRegistra = new Date(
          formValues.fechaRegistra
        ).toISOString();
      }
      if (formValues.fechaInactiva) {
        requestBody.fechaInactiva = new Date(
          formValues.fechaInactiva
        ).toISOString();
      }

      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, requestBody).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-camara']);
          },
          error: (e) => {
            console.error('Error al actualizar registro', e);
            this.snackBar.open('Error al actualizar el registro.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      } else {
        this.service.create(requestBody).subscribe({
          next: () => {
            this.snackBar.open('Registro creado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-camara']);
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
      this.tipoCamaraForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-camara']);
  }
}
