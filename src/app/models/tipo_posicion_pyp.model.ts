export interface TipoPosicionPyp {
  idTipoPosicion?: number;
  idClienteSistema: number;
  idTipoFormatoPlaca: number;
  posicionPyp: string;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
