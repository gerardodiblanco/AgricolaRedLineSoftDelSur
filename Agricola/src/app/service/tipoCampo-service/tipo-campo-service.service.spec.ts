import { TestBed, inject } from '@angular/core/testing';

import { TipoCampoServiceService } from './tipo-campo-service.service';

describe('TipoCampoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoCampoServiceService]
    });
  });

  it('should be created', inject([TipoCampoServiceService], (service: TipoCampoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
