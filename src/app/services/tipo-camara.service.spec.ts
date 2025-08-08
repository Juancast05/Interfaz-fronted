import { TestBed } from '@angular/core/testing';

import { TipoCamaraService } from './tipo-camara.service';

describe('TipoCamaraService', () => {
  let service: TipoCamaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCamaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
