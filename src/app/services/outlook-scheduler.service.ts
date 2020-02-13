import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LightningTalk } from '../model/lightning-talk';
@Injectable({
  providedIn: 'root'
})
export class OutlookSchedulerService {


  constructor(private _httpClient:HttpClient) { }


  addLT(startDateLT) {

    return this._httpClient.post('https://graph.microsoft.com/v1.0/me/calendar', startDateLT);

  }

  createEventInIvosCalendar(lightningTalk:LightningTalk) {
    var payload = `
    {
      "subject": "${lightningTalk.title}",
      "body": {
        "contentType": "HTML",
        "content": "<h1>Light</h1>${lightningTalk.description}</br></br>"
      },
      "start": {
          "dateTime": "${lightningTalk.start.toISOString()}",
          "timeZone" : "Pacific Standard Time"
      },
      "end": {
          "dateTime": "${lightningTalk.end.toISOString()}",
          "timeZone" : "Pacific Standard Time"
      },
      "location":{
          "displayName":"Espaço Talk / Transmissão"
      },
      "attendees": [
        {
          "emailAddress": {
            "address":"ivo.batistela@db1.com.br",
            "name": "John doe"
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
