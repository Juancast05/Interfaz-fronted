import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; // Importar el nuevo componente
import { CamaraListComponent } from './camara-list/camara-list.component';
import { CamaraFormComponent } from './camara-form/camara-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }, // RUTA PRINCIPAL: Dashboard
  { path: 'camaras', component: CamaraListComponent },
  { path: 'camaras/new', component: CamaraFormComponent },
  { path: 'camaras/edit/:id', component: CamaraFormComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/new', component: ClienteFormComponent },
  { path: 'clientes/edit/:id', component: ClienteFormComponent },
  { path: '**', redirectTo: '' }, // Redirigir cualquier ruta no encontrada al dashboard
];
