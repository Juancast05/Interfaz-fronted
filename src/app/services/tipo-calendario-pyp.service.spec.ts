import { TestBed } from '@angular/core/testing';

import { TipoCalendarioPypService } from './tipo-calendario-pyp.service';

describe('TipoCalendarioPypService', () => {
  let service: TipoCalendarioPypService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCalendarioPypService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
