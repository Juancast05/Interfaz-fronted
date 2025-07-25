// src/app/models/cliente-sistema.model.ts
export interface ClienteSistema {
  id_cliente_sistema?: number;
  nombre: string;
  ruta_base: string;
  ruta_destino: string;
  url_registro_detenccion: string;
  nodos: number;
  aplica_sabado: string;
  codigo_externo: string;
  activo: string;
}
