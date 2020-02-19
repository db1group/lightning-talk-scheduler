import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LightningTalk } from '../model/lightning-talk';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTransmissionService {

  constructor(private httpClient:HttpClient) { }

  scheduleTransmitionSupport(lightningTalk:LightningTalk) {
    var rawBody = this.renderTransmissionEmailBody(lightningTalk);

    return this.httpClient.post('https://graph.microsoft.com/v1.0/me/sendMail', rawBody, { headers: new HttpHeaders({'Content-type': 'application/json'}) });
  }

  private renderTransmissionEmailBody(lightningTalk:LightningTalk): string {
    var startDateFormatted = this.getBrlDate(lightningTalk.start);
    var startTimeFormatted = this.getBrlTime(lightningTalk.start);
    var endTimeFormatted = this.getBrlTime(lightningTalk.end);

    var mailBody = {
      "message": {
        "subject": "Tranmissão de Lightning Talk",
        "body": {
          "contentType": "Text",
          "content": `
  Solicito a transmissão da Lightning Talk "${lightningTalk.title}", que ocorrerá no dia ${startDateFormatted} das ${startTimeFormatted} até ${endTimeFormatted}
          
  Notas da pessoa solicitante:
    "${lightningTalk.tranmissionNeeds}"
 `
        },
        "toRecipients": [
          {
            "emailAddress": {
              "address": "ivo.batistela@db1.com.br"
            }
          }
        ]
      },
      "saveToSentItems": "true"
    };

    return JSON.stringify(mailBody);
  }

  private getBrlDate(desiredDate:Date): String {
    return `${desiredDate.getDate()}/${desiredDate.getMonth() + 1}/${desiredDate.getFullYear()}`;
  }

  private getBrlTime(desiredDate:Date): String {
    return `${desiredDate.getHours()}:${desiredDate.getMinutes()}`;
  }
}
