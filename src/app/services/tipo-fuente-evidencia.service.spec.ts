import { TestBed } from '@angular/core/testing';

import { TipoFuenteEvidenciaService } from './tipo-fuente-evidencia.service';

describe('TipoFuenteEvidenciaService', () => {
  let service: TipoFuenteEvidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFuenteEvidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
