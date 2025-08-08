export interface TipoServicio {
  idTipoServicio?: number;
  idClienteSistema: number;
  nombre: string;
  codigoServicio: string;
  valorHomologado?: string;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
