export interface TipoMotivoExento {
  idTipoMotivoExento?: number;
  idClienteSistema: number;
  codigoMotivo: string;
  nombreMotivo: string;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
