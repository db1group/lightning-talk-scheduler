import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OutlookSchedulerService {


  constructor(private _httpClient:HttpClient) { }


  addLT(startDateLT) {

    return this._httpClient.post('https://graph.microsoft.com/v1.0/me/calendar', startDateLT);

  }

  createEventInIvosCalendar() {
    var payload = `
    {
      "subject": "It is just a test from Ivo.",
      "body": {
        "contentType": "HTML",
        "content": "PRUEBAS"
      },
      "start": {
          "dateTime": "2020-02-11T12:00:00",
          "timeZone": "Pacific Standard Time"
      },
      "end": {
          "dateTime": "2020-02-11T13:00:00",
          "timeZone": "Pacific Standard Time"
      },
      "location":{
          "displayName":"Location test"
      },
      "attendees": [
        {
          "emailAddress": {
            "address":"ivo.batistela@gmail.com",
            "name": "Ivor"
          },
          "type": "required"
        }
      ]
    }`
    return this._httpClient.post('https://graph.microsoft.com/v1.0/me/calendar/events', payload, {
      headers: new HttpHeaders({'Content-type': 'application/json', 'Prefer': 'outlook.timezone="Pacific Stardand Time"'})
    });
  }

}
