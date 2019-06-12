import { TestBed } from '@angular/core/testing';

import { PrevisaoService } from './previsao.service';

describe('PrevisaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrevisaoService = TestBed.get(PrevisaoService);
    expect(service).toBeTruthy();
  });
});
