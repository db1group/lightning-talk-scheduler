import { Injectable } from '@angular/core';
import { LightningTalk } from '../model/lightning-talk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransmissionBodyRendererService {
  
  constructor() { }

  render(lightningTalk: LightningTalk): string {
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
              "address": environment.emailTransmission
            }
          }
        ]
      },
      "saveToSentItems": "true"
    };

    return JSON.stringify(mailBody);
  }

  private getBrlDate(desiredDate:Date): String {
    return `${('0' + desiredDate.getDate()).slice(-2)}/${('0' + (desiredDate.getMonth() + 1)).slice(-2)}/${desiredDate.getFullYear()}`;
  }

  private getBrlTime(desiredDate:Date): String {
    return `${('0' + desiredDate.getHours()).slice(-2)}:${('0' + desiredDate.getMinutes()).slice(-2)}`;
  }
}
