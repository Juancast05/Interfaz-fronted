export interface TipoCaracterPuntaje {
  idTipoCaracterPuntaje?: number;
  idTipoSistema?: number;
  idClienteSistema?: number;
  caracter: string;
  coeficienteDispositivo?: number;
  eficienciaDispositivo?: number;
  coeficienteSistema?: number;
  eficienciaSistema?: number;
  coeficienteQalpr?: number;
  eficienciaQalpr?: number;
  fechaRegistro?: string;
  activo: string;
  idTipoVehiculo?: number;
  versionScore?: string;
}
