import { TestBed } from '@angular/core/testing';

import { ScheduleTransmissionService } from './schedule-transmission.service';

describe('ScheduleTransmissionService', () => {
  let service: ScheduleTransmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTransmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
