import { TestBed } from '@angular/core/testing';

import { TipoClaseVehiculoService } from './tipo-clase-vehiculo.service';

describe('TipoClaseVehiculoService', () => {
  let service: TipoClaseVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoClaseVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
