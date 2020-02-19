import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OutlookSchedulerService } from './services/outlook-scheduler.service';
import { LoggedUserInfoService } from './services/logged-user-info.service';
import { ScheduleTransmissionService } from './services/schedule-transmission.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalInterceptor } from "@azure/msal-angular";
import { SchedulingPanelComponent } from './scheduling-panel/scheduling-panel.component'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TransmissionBodyRendererService } from './services/transmission-body-renderer.service';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

export const protectedResourceMap:[string, string[]][]=[ ['https://graph.microsoft.com/v1.0/', ['https://graph.microsoft.com/Calendars.ReadWrite.Shared', 'https://graph.microsoft.com/Calendars.ReadWrite', 'https://graph.microsoft.com/Mail.Send']] ];

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
      redirectUri: window.location.toString(),
      cacheLocation : "localStorage",
      postLogoutRedirectUri: window.location.toString(),
      navigateToLoginRequestUrl: true,
      protectedResourceMap: protectedResourceMap
    },),
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    OutlookSchedulerService,
    LoggedUserInfoService,
    ScheduleTransmissionService,
    TransmissionBodyRendererService,
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
