import { TestBed } from '@angular/core/testing';

import { GetUserProfileService } from './get-user-profile.service';

describe('GetUserProfileService', () => {
  let service: GetUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
