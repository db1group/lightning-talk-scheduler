import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OutlookSchedulerService {


  constructor(private _httpClient:HttpClient) { }

  addLT(startDateLT) {

    return this._httpClient.post('https://graph.microsoft.com/v1.0/me/calendar/events', startDateLT);

  }

}
