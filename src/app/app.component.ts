import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como ngIf, ngFor
import { RouterModule } from '@angular/router'; // Para <router-outlet> y routerLink
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true, // ¡Confirmar que es standalone!
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent, // Importa RouterModule aquí para que router-outlet y routerLink funcionen
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'INTERFAZ-FRONTEND'; // O el título de tu aplicación
}
