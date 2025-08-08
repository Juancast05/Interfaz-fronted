import { TestBed } from '@angular/core/testing';

import { TipoMotivoReenvioService } from './tipo-motivo-reenvio.service';

describe('TipoMotivoReenvioService', () => {
  let service: TipoMotivoReenvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMotivoReenvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
