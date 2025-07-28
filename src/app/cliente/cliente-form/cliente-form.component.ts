// src/app/cliente/cliente-form/cliente-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClienteSistema } from '../../models/cliente-sistema.model';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; // Para los iconos en el título
import { MatExpansionModule } from '@angular/material/expansion'; // Para los paneles de expansión

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule, // Importar el módulo de expansión
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css',
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  isEditMode: boolean = false;
  clienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      ruta_base: ['', Validators.required],
      ruta_destino: ['', Validators.required],
      url_registro_detenccion: [
        '',
        [Validators.required, Validators.pattern('^(http|https)://.*$')],
      ],
      nodos: [null, [Validators.required, Validators.min(0)]],
      aplica_sabado: ['NO', Validators.required],
      codigo_externo: ['', Validators.required],
      activo: ['SI', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clienteId = +id;
        this.clienteService.getClienteById(this.clienteId).subscribe({
          next: (cliente) => {
            this.clienteForm.patchValue(cliente);
          },
          error: (error) => {
            console.error('Error al cargar cliente para edición:', error);
            this.snackBar.open(
              'Error al cargar los datos del cliente.',
              'Cerrar',
              { duration: 3000 }
            );
            this.router.navigate(['/clientes']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: ClienteSistema = this.clienteForm.value;

      if (this.isEditMode && this.clienteId) {
        cliente.id_cliente_sistema = this.clienteId;
        this.clienteService.updateCliente(this.clienteId, cliente).subscribe({
          next: () => {
            this.snackBar.open('Cliente actualizado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/clientes']);
          },
          error: (error) => {
            console.error('Error al actualizar cliente:', error);
            this.snackBar.open('Error al actualizar cliente.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      } else {
        delete cliente.id_cliente_sistema;
        this.clienteService.createCliente(cliente).subscribe({
          next: () => {
            this.snackBar.open('Cliente registrado exitosamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/clientes']);
          },
          error: (error) => {
            console.error('Error al registrar cliente:', error);
            this.snackBar.open('Error al registrar cliente.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this.snackBar.open(
        'Por favor, completa todos los campos requeridos y válidos.',
        'Cerrar',
        { duration: 3000 }
      );
      this.clienteForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
