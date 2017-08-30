import { TestBed, inject } from '@angular/core/testing';

import { CampoService } from './campo.service';

describe('CampoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampoService]
    });
  });

  it('should be created', inject([CampoService], (service: CampoService) => {
    expect(service).toBeTruthy();
  }));
});
