import { TestBed } from '@angular/core/testing';

import { TipoEstadoSolicitudService } from './tipo-estado-solicitud.service';

describe('TipoEstadoSolicitudService', () => {
  let service: TipoEstadoSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEstadoSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
