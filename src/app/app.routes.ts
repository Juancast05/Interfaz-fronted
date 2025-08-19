import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CamaraListComponent } from './camara/camara-list/camara-list.component';
import { CamaraFormComponent } from './camara/camara-form/camara-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { TablasParametricasComponent } from './catalogos/tablas-parametricas/tablas-parametricas.component';
import { TipoCalendarioPypListComponent } from './catalogos/tipo-calendario-pyp/tipo-calendario-pyp-list.component';
import { TipoCalendarioPypFormComponent } from './catalogos/tipo-calendario-pyp/tipo-calendario-pyp-form.component';
import { TipoClaseVehiculoListComponent } from './catalogos/tipo-clase-vehiculo/tipo-clase-vehiculo-list.component';
import { TipoClaseVehiculoFormComponent } from './catalogos/tipo-clase-vehiculo/tipo-clase-vehiculo-form.component';
import { TipoEstadoEvidenciaListComponent } from './catalogos/tipo-estado-evidencia/tipo-estado-evidencia-list.component';
import { TipoEstadoEvidenciaFormComponent } from './catalogos/tipo-estado-evidencia/tipo-estado-evidencia-form.component';
import { TipoEstadoReenvioFormComponent } from './catalogos/tipo-estado-reenvio/tipo-estado-reenvio-form.component';
import { TipoEstadoReenvioListComponent } from './catalogos/tipo-estado-reenvio/tipo-estado-reenvio-list.component';
import { TipoEstadoSolicitudFormComponent } from './catalogos/tipo-estado-solicitud/tipo-estado-solicitud-form.component';
import { TipoEstadoSolicitudListComponent } from './catalogos/tipo-estado-solicitud/tipo-estado-solicitud-list.component';
import { TipoEvidenciaListComponent } from './catalogos/tipo-evidencia/tipo-evidencia-list.component';
import { TipoEvidenciaFormComponent } from './catalogos/tipo-evidencia/tipo-evidencia-form.component';
import { TipoEvidenciaInfraccionListComponent } from './catalogos/tipo-evidencia-infraccion/tipo-evidencia-infraccion-list.component';
import { TipoEvidenciaInfraccionFormComponent } from './catalogos/tipo-evidencia-infraccion/tipo-evidencia-infraccion-form.component';
import { TipoExentoListComponent } from './catalogos/tipo-exento/tipo-exento-list.component';
import { TipoExentoFormComponent } from './catalogos/tipo-exento/tipo-exento-form.component';
import { TipoJornadaPypListComponent } from './catalogos/tipo-jornada-pyp/tipo-jornada-pyp-list.component';
import { TipoJornadaPypFormComponent } from './catalogos/tipo-jornada-pyp/tipo-jornada-pyp-form.component';
import { TipoMotivoExentoListComponent } from './catalogos/tipo-motivo-exento/tipo-motivo-exento-list.component';
import { TipoMotivoExentoFormComponent } from './catalogos/tipo-motivo-exento/tipo-motivo-exento-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'camaras', component: CamaraListComponent },
  { path: 'camaras/new', component: CamaraFormComponent },
  { path: 'camaras/edit/:id', component: CamaraFormComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/new', component: ClienteFormComponent },
  { path: 'clientes/edit/:id', component: ClienteFormComponent },
  {
    path: 'catalogos',
    children: [
      { path: '', redirectTo: 'tablas-parametricas', pathMatch: 'full' },
      { path: 'tablas-parametricas', component: TablasParametricasComponent },
      {
        path: 'tipos-calendario-pyp',
        component: TipoCalendarioPypListComponent,
      },
      {
        path: 'tipos-calendario-pyp/new',
        component: TipoCalendarioPypFormComponent,
      },
      {
        path: 'tipos-calendario-pyp/edit/:id',
        component: TipoCalendarioPypFormComponent,
      },
      {
        path: 'tipos-clase-vehiculo',
        component: TipoClaseVehiculoListComponent,
      },
      {
        path: 'tipos-clase-vehiculo/new',
        component: TipoClaseVehiculoFormComponent,
      },
      {
        path: 'tipos-clase-vehiculo/edit/:id',
        component: TipoClaseVehiculoFormComponent,
      },
      {
        path: 'tipos-estado-evidencia',
        component: TipoEstadoEvidenciaListComponent,
      },
      {
        path: 'tipos-estado-evidencia/new',
        component: TipoEstadoEvidenciaFormComponent,
      },
      {
        path: 'tipos-estado-evidencia/edit/:id',
        component: TipoEstadoEvidenciaFormComponent,
      },
      {
        path: 'tipos-estado-reenvio',
        component: TipoEstadoReenvioListComponent,
      },
      {
        path: 'tipos-estado-reenvio/new',
        component: TipoEstadoReenvioFormComponent,
      },
      {
        path: 'tipos-estado-reenvio/edit/:id',
        component: TipoEstadoReenvioFormComponent,
      },
      {
        path: 'tipos-estado-solicitud',
        component: TipoEstadoSolicitudListComponent,
      },
      {
        path: 'tipos-estado-solicitud/new',
        component: TipoEstadoSolicitudFormComponent,
      },
      {
        path: 'tipos-estado-solicitud/edit/:id',
        component: TipoEstadoSolicitudFormComponent,
      },
      {
        path: 'tipos-evidencia',
        component: TipoEvidenciaListComponent,
      },
      {
        path: 'tipos-evidencia/new',
        component: TipoEvidenciaFormComponent,
      },
      {
        path: 'tipos-evidencia/edit/:id',
        component: TipoEvidenciaFormComponent,
      },
      {
        path: 'tipos-evidencia-infraccion',
        component: TipoEvidenciaInfraccionListComponent,
      },
      {
        path: 'tipos-evidencia-infraccion/new',
        component: TipoEvidenciaInfraccionFormComponent,
      },
      {
        path: 'tipos-evidencia-infraccion/edit/:id',
        component: TipoEvidenciaInfraccionFormComponent,
      },
      {
        path: 'tipos-exento',
        component: TipoExentoListComponent,
      },
      {
        path: 'tipos-exento/new',
        component: TipoExentoFormComponent,
      },
      {
        path: 'tipos-exento/edit/:id',
        component: TipoExentoFormComponent,
      },
      {
        path: 'tipos-jornada-pyp',
        component: TipoJornadaPypListComponent,
      },
      {
        path: 'tipos-jornada-pyp/new',
        component: TipoJornadaPypFormComponent,
      },
      {
        path: 'tipos-jornada-pyp/edit/:id',
        component: TipoJornadaPypFormComponent,
      },
      {
        path: 'tipos-motivo-exento',
        component: TipoMotivoExentoListComponent,
      },
      {
        path: 'tipos-motivo-exento/new',
        component: TipoMotivoExentoFormComponent,
      },
      {
        path: 'tipos-motivo-exento/edit/:id',
        component: TipoMotivoExentoFormComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
