import { TestBed } from '@angular/core/testing';

import { CreateTrailService } from './create-trail-service';

describe('CreateTrailService', () => {
  let service: CreateTrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
