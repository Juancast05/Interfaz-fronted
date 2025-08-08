import { TestBed } from '@angular/core/testing';

import { TipoMotivoDescarteService } from './tipo-motivo-descarte.service';

describe('TipoMotivoDescarteService', () => {
  let service: TipoMotivoDescarteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMotivoDescarteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
