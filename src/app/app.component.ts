import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como ngIf, ngFor
import { RouterModule } from '@angular/router'; // Para <router-outlet> y routerLink

// Modulos de Angular Material para el toolbar
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true, // ¡Confirmar que es standalone!
  imports: [
    CommonModule,
    RouterModule, // Importa RouterModule aquí para que router-outlet y routerLink funcionen
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'INTERFAZ-FRONTEND'; // O el título de tu aplicación
}
