import { TestBed } from '@angular/core/testing';

import { TipoEvidenciaService } from './tipo-evidencia.service';

describe('TipoEvidenciaService', () => {
  let service: TipoEvidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEvidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
