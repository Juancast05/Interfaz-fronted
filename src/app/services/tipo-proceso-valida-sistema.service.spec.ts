import { TestBed } from '@angular/core/testing';

import { TipoProcesoValidaSistemaService } from './tipo-proceso-valida-sistema.service';

describe('TipoProcesoValidaSistemaService', () => {
  let service: TipoProcesoValidaSistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProcesoValidaSistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
