import { TestBed } from '@angular/core/testing';

import { TipoCaracterPuntajeService } from './tipo-caracter-puntaje.service';

describe('TipoCaracterPuntajeService', () => {
  let service: TipoCaracterPuntajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCaracterPuntajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
