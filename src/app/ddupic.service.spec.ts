import {TestBed} from '@angular/core/testing';

import {DdupicService} from './ddupic.service';

describe('DdupicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DdupicService = TestBed.get(DdupicService);
    expect(service).toBeTruthy();
  });
});
