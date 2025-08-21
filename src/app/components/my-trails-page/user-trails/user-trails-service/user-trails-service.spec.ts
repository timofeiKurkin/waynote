import { TestBed } from '@angular/core/testing';

import { UserTrailsService } from './user-trails-service';

describe('UserTrailsService', () => {
  let service: UserTrailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTrailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
