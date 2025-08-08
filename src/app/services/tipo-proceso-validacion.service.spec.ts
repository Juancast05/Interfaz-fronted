import { TestBed } from '@angular/core/testing';

import { TipoProcesoValidacionService } from './tipo-proceso-validacion.service';

describe('TipoProcesoValidacionService', () => {
  let service: TipoProcesoValidacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProcesoValidacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
