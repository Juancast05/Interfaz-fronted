import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes'; // Tus rutas

// Importaciones de Angular Material que necesitan estar disponibles a nivel de aplicación (para los servicios o providers)
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Necesario para el servicio MatSnackBar
import { MatDatepickerModule } from '@angular/material/datepicker'; // Para el datepicker en formularios
import { MatNativeDateModule } from '@angular/material/core'; // Para MatDatepicker (proporciona DateAdapter)

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Provee HttpClient para todos los servicios
    provideAnimations(), // Provee el módulo de animaciones para Angular Material
    importProvidersFrom(
      // Usamos importProvidersFrom para importar módulos que no son proveedores directos pero son necesarios
      MatSnackBarModule,
      MatDatepickerModule,
      MatNativeDateModule
      // Agrega aquí cualquier otro módulo de Material o de terceros que realmente necesites globalmente
      // La mayoría de los módulos de componentes de Material se importan en cada componente standalone que los usa.
    ),
  ],
};
