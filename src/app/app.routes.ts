import { Routes } from '@angular/router';

// Importa tus componentes de cámara (asumo que los tienes)
import { CamaraListComponent } from './camara-list/camara-list.component';
import { CamaraFormComponent } from './camara-form/camara-form.component';

// Importa los componentes de cliente
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/camaras', pathMatch: 'full' }, // Redirección inicial
  { path: 'camaras', component: CamaraListComponent },
  { path: 'camaras/new', component: CamaraFormComponent },
  { path: 'camaras/edit/:id', component: CamaraFormComponent },
  // ** RUTAS PARA CLIENTES **
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/new', component: ClienteFormComponent },
  { path: 'clientes/edit/:id', component: ClienteFormComponent },
  // Ruta comodín para cualquier otra URL no definida
  { path: '**', redirectTo: '/camaras' },
];
