import { TestBed } from '@angular/core/testing';

import { TipoClasificacionEvidenciaService } from './tipo-clasificacion-evidencia.service';

describe('TipoClasificacionEvidenciaService', () => {
  let service: TipoClasificacionEvidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoClasificacionEvidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
