import { TestBed } from '@angular/core/testing';

import { VdmcApiService } from './vdmc-api.service';

describe('VdmcApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VdmcApiService = TestBed.get(VdmcApiService);
    expect(service).toBeTruthy();
  });
});
