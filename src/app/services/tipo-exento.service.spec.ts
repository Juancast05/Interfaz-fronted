import { TestBed } from '@angular/core/testing';

import { TipoExentoService } from './tipo-exento.service';

describe('TipoExentoService', () => {
  let service: TipoExentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoExentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
