import { TestBed } from '@angular/core/testing';

import { OutlookSchedulerService } from './outlook-scheduler.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'



describe('OutlookSchedulerService', () => {

  let httpTestingController: HttpTestingController;
  let outlookSchedulerService : OutlookSchedulerService;

  beforeEach(() => 
  {
    TestBed.configureTestingModule({
      providers: [OutlookSchedulerService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    outlookSchedulerService = TestBed.get(OutlookSchedulerService);
 
  });

  afterEach(()=> httpTestingController.verify());

  it('should be created', () => {
    expect(outlookSchedulerService).toBeTruthy();
  });

  it('should created event in outlook', () => {
    const expectedScheduledResponse = {
      "start": {
          "dateTime": "2019-12-10T15:00:00.0000000",
          "timeZone": "America/Sao_Paulo"
      },
      "end": {
          "dateTime": "2019-12-10T15:30:00.0000000",
          "timeZone": "America/Sao_Paulo"
      }
    };

    outlookSchedulerService.addLT('2019-12-10T15:00:00').subscribe(result=>{
      expect(result).toEqual(expectedScheduledResponse);
    })

    const req = httpTestingController.expectOne('https://graph.microsoft.com/v1.0/me/calendar/events')

    expect(req.request.method).toEqual('POST')

    req.flush(expectedScheduledResponse);

  })

});
