// src/app/models/camara.model.ts
export interface Camara {
  id_info_camara?: number;
  id_cliente_sistema: number;
  id_tipo_proveedor_camara: number;
  id_tipo_camara: number;
  id_tipo_tecnologia: number;
  index_code_proveedor: string;
  codigo_camara: string;
  codigo_equipo: string;
  direccion: string;
  maximocarril: number;
  fecha_calibracion: string; // Se manejará como string ISO 8601
  serial_camara: string;
  alias_camara: string;
  fecha_registra?: string;
  fecha_modifica?: string;
  id_usuario_registra: number;
  id_usuario_modifica: number;
  id_tipo_fuente_evidencia: number;
  latitud: string;
  longitud: string;
  activo: string;
  punto_Referencia_inicial: string;
  punto_Referencia_final: string;
  metros_referencia: number;
  velocidad_maxima_camara: number;
  tolerancia_permitida: number;
  resolucion_camara: string;
}
