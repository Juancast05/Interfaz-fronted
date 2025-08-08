export interface TipoClaseVehiculo {
  idTipoClaseVehiculo?: number;
  idClienteSistema: number;
  codigoClasificacion: string;
  nombre: string;
  valorHomologado?: string;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
