import { TestBed } from '@angular/core/testing';

import { TipoMotivoExentoService } from './tipo-motivo-exento.service';

describe('TipoMotivoExentoService', () => {
  let service: TipoMotivoExentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMotivoExentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
