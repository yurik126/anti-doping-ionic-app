import { TestBed } from '@angular/core/testing';

import { VdmcRequestService } from './vdmc-request.service';

describe('VdmcRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VdmcRequestService = TestBed.get(VdmcRequestService);
    expect(service).toBeTruthy();
  });
});
