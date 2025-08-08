import { TestBed } from '@angular/core/testing';

import { TipoClaseInfraccionService } from './tipo-clase-infraccion.service';

describe('TipoClaseInfraccionService', () => {
  let service: TipoClaseInfraccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoClaseInfraccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
