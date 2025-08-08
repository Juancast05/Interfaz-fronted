import { TestBed } from '@angular/core/testing';

import { TipoCarrilService } from './tipo-carril.service';

describe('TipoCarrilService', () => {
  let service: TipoCarrilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCarrilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
