import { TestBed } from '@angular/core/testing';

import { TipoEvidenciaInfraccionService } from './tipo-evidencia-infraccion.service';

describe('TipoEvidenciaInfraccionService', () => {
  let service: TipoEvidenciaInfraccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEvidenciaInfraccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
