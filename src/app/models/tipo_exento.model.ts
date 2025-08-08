export interface TipoExento {
  idTipoExento?: number;
  idClienteSistema: number;
  codigoExento: string;
  descripcionExento: string;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
