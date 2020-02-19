import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LightningTalk } from '../model/lightning-talk';
import { TransmissionBodyRendererService } from './transmission-body-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTransmissionService {

  constructor(private httpClient:HttpClient,
              private transmissionBodyRanderer:TransmissionBodyRendererService) { }

  scheduleTransmitionSupport(lightningTalk:LightningTalk) {
    const rawBody = this.transmissionBodyRanderer.render(lightningTalk);
    return this.httpClient.post('https://graph.microsoft.com/v1.0/me/sendMail', rawBody, { headers: new HttpHeaders({'Content-type': 'application/json'}) });
  }
}
