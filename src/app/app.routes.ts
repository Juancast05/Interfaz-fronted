// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Esta ruta ahora será correcta porque la carpeta "camara-dashboard" existe
import { CamaraDashboardComponent } from './camara-dashboard/camara-dashboard.component';

// Estas rutas ya deberían estar correctas después de moverlos directamente a 'app/'
import { CamaraListComponent } from './camara-list/camara-list.component';
import { CamaraFormComponent } from './camara-form/camara-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/camaras-dashboard', pathMatch: 'full' },
  { path: 'camaras-dashboard', component: CamaraDashboardComponent },
  { path: 'camaras', component: CamaraListComponent },
  { path: 'camaras/new', component: CamaraFormComponent },
  { path: 'camaras/edit/:id', component: CamaraFormComponent },
  { path: '**', redirectTo: '/camaras-dashboard' },
];
