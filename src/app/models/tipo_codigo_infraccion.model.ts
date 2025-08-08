export interface TipoCodigoInfraccion {
  idTipoCodigoInfraccion?: number;
  idClienteSistema: number;
  codigoInfraccion: string;
  descripcion: string;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
  idTipoClaseInfraccion: number;
}
