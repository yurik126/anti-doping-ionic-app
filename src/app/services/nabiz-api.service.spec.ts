import { TestBed } from '@angular/core/testing';

import { NabizApiService } from './nabiz-api.service';

describe('NabizApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NabizApiService = TestBed.get(NabizApiService);
    expect(service).toBeTruthy();
  });
});
