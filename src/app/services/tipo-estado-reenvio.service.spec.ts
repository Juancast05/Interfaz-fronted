import { TestBed } from '@angular/core/testing';

import { TipoEstadoReenvioService } from './tipo-estado-reenvio.service';

describe('TipoEstadoReenvioService', () => {
  let service: TipoEstadoReenvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEstadoReenvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
