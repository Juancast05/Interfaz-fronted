import { TestBed } from '@angular/core/testing';

import { TipoTecnologiaService } from './tipo-tecnologia.service';

describe('TipoTecnologiaService', () => {
  let service: TipoTecnologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTecnologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
