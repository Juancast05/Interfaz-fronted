import { TestBed } from '@angular/core/testing';

import { TipoServicioPlataformaService } from './tipo-servicio-plataforma.service';

describe('TipoServicioPlataformaService', () => {
  let service: TipoServicioPlataformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServicioPlataformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
