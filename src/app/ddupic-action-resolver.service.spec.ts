import {TestBed} from '@angular/core/testing';

import {DdupicActionResolverService} from './ddupic-action-resolver.service';

describe('DdupicActionResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DdupicActionResolverService = TestBed.get(DdupicActionResolverService);
    expect(service).toBeTruthy();
  });
});
