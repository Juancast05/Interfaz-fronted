import { TestBed } from '@angular/core/testing';

import { TipoCodigoInfraccionService } from './tipo-codigo-infraccion.service';

describe('TipoCodigoInfraccionService', () => {
  let service: TipoCodigoInfraccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCodigoInfraccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
