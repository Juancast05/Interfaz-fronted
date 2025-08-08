import { TestBed } from '@angular/core/testing';

import { TipoProcesoAutomaticoService } from './tipo-proceso-automatico.service';

describe('TipoProcesoAutomaticoService', () => {
  let service: TipoProcesoAutomaticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProcesoAutomaticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
