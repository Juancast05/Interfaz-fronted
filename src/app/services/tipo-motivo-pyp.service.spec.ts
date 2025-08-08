import { TestBed } from '@angular/core/testing';

import { TipoMotivoPypService } from './tipo-motivo-pyp.service';

describe('TipoMotivoPypService', () => {
  let service: TipoMotivoPypService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMotivoPypService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
