import { TestBed } from '@angular/core/testing';

import { TipoProveedorCamaraService } from './tipo-proveedor-camara.service';

describe('TipoProveedorCamaraService', () => {
  let service: TipoProveedorCamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProveedorCamaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
