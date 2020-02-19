import { TestBed } from '@angular/core/testing';

import { LoggedUserInfoService } from './logged-user-info.service';

describe('LoggedUserInfoService', () => {
  let service: LoggedUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserInfoService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
