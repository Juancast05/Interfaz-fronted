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

import { TipoCaracterPuntaje } from '../../models/tipo_caracter_puntaje.model';
import { TipoCaracterPuntajeService } from '../../services/tipo-caracter-puntaje.service';

@Component({
  selector: 'app-tipo-caracter-puntaje-form',
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
  templateUrl: './tipo-caracter-puntaje-form.component.html',
  styleUrl: './tipo-caracter-puntaje-form.component.css',
})
export class TipoCaracterPuntajeFormComponent implements OnInit {
  tipoCaracterPuntajeForm!: FormGroup;
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoCaracterPuntajeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoCaracterPuntajeForm = this.fb.group({
      idTipoCaracterPuntaje: [null],
      idTipoSistema: [null],
      idClienteSistema: [null],
      caracter: ['', Validators.required],
      coeficienteDispositivo: [null],
      eficienciaDispositivo: [null],
      coeficienteSistema: [null],
      eficienciaSistema: [null],
      coeficienteQalpr: [null],
      eficienciaQalpr: [null],
      fechaRegistro: [null],
      activo: ['S', Validators.required],
      idTipoVehiculo: [null],
      versionScore: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.itemId = +id;
        this.service.getById(this.itemId).subscribe({
          next: (data) => {
            const fechaRegistro = data.fechaRegistro
              ? new Date(data.fechaRegistro)
              : null;
            this.tipoCaracterPuntajeForm.patchValue({
              ...data,
              fechaRegistro,
            });
          },
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-caracter-puntaje']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoCaracterPuntajeForm.valid) {
      const formValues = this.tipoCaracterPuntajeForm.value;

      const requestBody = {
        ...formValues,
      };

      if (formValues.fechaRegistro) {
        requestBody.fechaRegistro = new Date(
          formValues.fechaRegistro
        ).toISOString();
      }

      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, requestBody).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-caracter-puntaje']);
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
            this.router.navigate(['/catalogos/tipos-caracter-puntaje']);
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
        {
          duration: 3000,
        }
      );
      this.tipoCaracterPuntajeForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-caracter-puntaje']);
  }
}
