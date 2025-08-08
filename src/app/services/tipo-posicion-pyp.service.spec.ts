import { TestBed } from '@angular/core/testing';

import { TipoPosicionPypService } from './tipo-posicion-pyp.service';

describe('TipoPosicionPypService', () => {
  let service: TipoPosicionPypService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPosicionPypService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
