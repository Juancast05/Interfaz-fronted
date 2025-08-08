import { TestBed } from '@angular/core/testing';

import { TipoJornadaPypService } from './tipo-jornada-pyp.service';

describe('TipoJornadaPypService', () => {
  let service: TipoJornadaPypService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoJornadaPypService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
