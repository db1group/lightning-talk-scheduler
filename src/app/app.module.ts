import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OutlookSchedulerService } from './services/outlook-scheduler.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { SchedulingPanelComponent } from './scheduling-panel/scheduling-panel.component'

export const protectedResourceMap:[string, string[]][]=[ ['https://graph.microsoft.com/v1.0/me/calendar/events', ['https://graph.microsoft.com/Calendars.ReadWrite.Shared', 'https://graph.microsoft.com/Calendars.ReadWrite']] ];

@NgModule({
  declarations: [
    AppComponent,
    SchedulingPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MsalModule.forRoot({
      clientID: '36c1d0da-7b40-4355-a0c6-11f274c6a023',
      authority: "https://login.microsoftonline.com/ea47001a-3428-40f3-8ea1-86bdb1a3bc84/",
      validateAuthority: true,
      redirectUri: "http://localhost:4200",
      cacheLocation : "localStorage",
      postLogoutRedirectUri: "https://login.microsoftonline.com/common/oauth2/nativeclient",
      navigateToLoginRequestUrl: true,
      protectedResourceMap: protectedResourceMap
    })
  ],
  providers: [HttpClient, OutlookSchedulerService, {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
