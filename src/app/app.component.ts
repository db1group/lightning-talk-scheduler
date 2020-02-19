import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { OutlookSchedulerService } from './services/outlook-scheduler.service';
import { LightningTalk } from './model/lightning-talk';
import { LoggedUserInfoService } from './services/logged-user-info.service';
import { ScheduleTransmissionService } from './services/schedule-transmission.service';
import { LoggedUserData } from './model/logged-user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public loggedUserData:LoggedUserData = {
    name: '',
    photo: ''
  };

  constructor(private broadcastService: BroadcastService, private authService: MsalService, private outlookScheduler: OutlookSchedulerService, private loggedUserInfo: LoggedUserInfoService, private scheduleTranmissionService: ScheduleTransmissionService){
  
    if (this.isLogged()) {
      this.updateLoggedUserInfo();
    }
      
    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      this.updateLoggedUserInfo();
    });  
  }

  public scheduleALightningTalk() {
    var startDate = new Date();
    var endDate = new Date();

    endDate.setHours(startDate.getHours() + 1);

    var lightningTalk:LightningTalk = {
        title: 'Teste de título de Lightning Talk !@#$%ˆ&*()',
        description: 'starting with a small description',
        start: startDate,
        end: endDate,
        tranmissionNeeds: 'Não preciso de nada',
        technical: true
    }

    this.outlookScheduler.scheduleLightningTalkInPeopleCalendar(this.loggedUserData, lightningTalk)
      .subscribe(console.log, console.log);

    this.scheduleTranmissionService.scheduleTransmitionSupport(lightningTalk)
      .subscribe(console.log, console.log);
  }

  public logar(){
    this.authService.loginRedirect([
      "https://graph.microsoft.com/User.Read", 
      "https://graph.microsoft.com/Mail.Send", 
      "https://graph.microsoft.com/Calendars.ReadWrite",
      "https://graph.microsoft.com/Calendars.ReadWrite.Shared",
      "https://graph.microsoft.com/email",
      "https://graph.microsoft.com/profile"
    ]);
  }

  public logout(){
    this.authService.logout();
  }

  public isLogged() {
    return !!this.authService.getUser();
  }

  private updateLoggedUserInfo(): void {
    this.loggedUserInfo
        .getLoggedUserInfo()
        .subscribe(userDataFound => this.loggedUserData = userDataFound, alert);
  }
}
