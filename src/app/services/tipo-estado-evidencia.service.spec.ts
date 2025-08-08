import { TestBed } from '@angular/core/testing';

import { TipoEstadoEvidenciaService } from './tipo-estado-evidencia.service';

describe('TipoEstadoEvidenciaService', () => {
  let service: TipoEstadoEvidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEstadoEvidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
