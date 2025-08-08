export interface TipoEvidenciaInfraccion {
  idTipoEvidenciaInfraccion?: number;
  idTipoCodigoInfraccion: number;
  idTipoEvidencia: number;
  fechaInicio?: Date;
  fechaFin?: Date;
  activo: string;
}
