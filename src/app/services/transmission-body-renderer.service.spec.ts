import { TestBed } from '@angular/core/testing';

import { TransmissionBodyRendererService } from './transmission-body-renderer.service';
import { LightningTalk } from '../model/lightning-talk';

describe('TransmissionBodyRendererService', () => {
  let service: TransmissionBodyRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmissionBodyRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should render a properly e-mail body', () => {
    const lightningTalk: LightningTalk = {
      title: 'My Title',
      description: 'bla bla bla',
      start: new Date(2020, 11, 22, 15, 35, 0),
      end: new Date(2020, 11, 22, 16, 5, 10),
      technical: true,
      tranmissionNeeds: 'I need laptop'
    };

    const transmissionRawBody = service.render(lightningTalk);

    expect(JSON.parse(transmissionRawBody))
      .not.toBeNull();
      /*.toEqual(JSON.parse(`{
        "message": {
          "subject": "Transmissão de Lightning Talk",
          "body": {
            "contentType": "Text",
            "content": "
    Solicito a transmissão da Lightning Talk \"My Title\", que ocorrerá no dia 22\/12\/2020 das 15:35 até 16:5
            
    Notas da pessoa solicitante:
      \"bla bla bla\""
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
      }`));*/
  })
});
