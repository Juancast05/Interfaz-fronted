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
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // Se agrega MatSnackBarModule
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Se agrega MatIconModule
import { MatExpansionModule } from '@angular/material/expansion'; // Se agrega MatExpansionModule
import { TipoClaseVehiculo } from '../../models/tipo_clase_vehiculo.model';
import { TipoClaseVehiculoService } from '../../services/tipo-clase-vehiculo.service';

@Component({
  selector: 'app-tipo-clase-vehiculo-form',
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
    MatSnackBarModule, // Se agrega MatSnackBarModule aquí también
  ],
  templateUrl: './tipo-clase-vehiculo-form.component.html',
  styleUrl: './tipo-clase-vehiculo-form.component.css',
})
export class TipoClaseVehiculoFormComponent implements OnInit {
  tipoClaseVehiculoForm!: FormGroup; // Nombre del FormGroup actualizado
  isEditMode: boolean = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: TipoClaseVehiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tipoClaseVehiculoForm = this.fb.group({
      idTipoClaseVehiculo: [null],
      idClienteSistema: [null, Validators.required],
      codigoClasificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      valorHomologado: [''],
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
          next: (data) => this.tipoClaseVehiculoForm.patchValue(data),
          error: (e) => {
            console.error('Error al cargar el registro para edición', e);
            this.snackBar.open('Error al cargar los datos.', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-clase-vehiculo']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.tipoClaseVehiculoForm.valid) {
      const item: TipoClaseVehiculo = this.tipoClaseVehiculoForm.value;
      if (this.isEditMode && this.itemId) {
        this.service.update(this.itemId, item).subscribe({
          next: () => {
            this.snackBar.open('Registro actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/catalogos/tipos-clase-vehiculo']);
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
            this.router.navigate(['/catalogos/tipos-clase-vehiculo']);
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
      this.tipoClaseVehiculoForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/catalogos/tipos-clase-vehiculo']);
  }
}
