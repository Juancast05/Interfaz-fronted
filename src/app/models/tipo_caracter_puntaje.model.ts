export interface TipoCaracterPuntaje {
  idCaracterPuntaje?: number;
  nombreCaracter: string;
  descripcion: string;
  valor: number;
  fechaRegistra?: Date;
  fechaInactiva?: Date;
  activo: string;
}
