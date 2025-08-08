export interface TipoProcesoValidacion {
  idTipoProcesoValidacion?: number;
  idClienteSistema: number;
  nombre: string;
  idTipoCodigoInfraccion: number;
  maximoReporteDetecciones?: number;
  diasReporteDeteccion?: number;
  diasHabilesReporteDeteccion: string;
  diasGestionEntrega?: number;
  diasHabilesGestionEntrega: string;
  minimoImagenesReporte?: number;
  validaExento?: number;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
