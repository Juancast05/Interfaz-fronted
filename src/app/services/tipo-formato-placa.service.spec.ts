import { TestBed } from '@angular/core/testing';

import { TipoFormatoPlacaService } from './tipo-formato-placa.service';

describe('TipoFormatoPlacaService', () => {
  let service: TipoFormatoPlacaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFormatoPlacaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
