import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { OutlookSchedulerService } from './services/outlook-scheduler.service';
import { LightningTalk } from './model/lightning-talk';
import { LoggedUserInfoService } from './services/logged-user-info.service';
import { ScheduleTransmissionService } from './services/schedule-transmission.service';
import { LoggedUserData } from './model/logged-user-data';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  private static BR_TIME_VALIDATOR = /^([0-1]?[0-9]|[2][0-3]):([0-5]?[0-9])$/m;

  public loggedUserData:LoggedUserData = {
    name: '',
    photo: ''
  };
  public formLt:FormGroup;
  public status = {
    tranmission:null,
    calendar:null
  };
  constructor(private broadcastService: BroadcastService, 
              private authService: MsalService, 
              private outlookScheduler: OutlookSchedulerService, 
              private loggedUserInfo: LoggedUserInfoService, 
              private scheduleTranmissionService: ScheduleTransmissionService,
              private formBuilder:FormBuilder){
  
    if (this.isLogged()) {
      this.updateLoggedUserInfo();
    }
      
    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      this.updateLoggedUserInfo();
    });  

    this.formLt = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        startTime: ['', [Validators.required, Validators.pattern(AppComponent.BR_TIME_VALIDATOR)]],
        endTime: ['', [ Validators.required, Validators.pattern(AppComponent.BR_TIME_VALIDATOR)]],
        tranmissionNeeds: [''],
        technical: [false]
    }, { validators: this.endTimeGreatherThanStartTimeValidator() });
  }

  abrirCalendario(item){
    item.open();
  }

  public scheduleALightningTalk() {
    const formValue = this.formLt.value;
    const timeStart = formValue.startTime.split(":");
    const timeEnd = formValue.endTime.split(":");
    const startDate = new Date(formValue.date);
    startDate.setHours(timeStart[0],timeStart[1]);
    const endDate = new Date(formValue.date);
    endDate.setHours(timeEnd[0],timeEnd[1]);
    var lightningTalk:LightningTalk = {
      title: formValue.title,
      description: formValue.description,
      start: startDate,
      end: endDate,
      tranmissionNeeds: formValue.tranmissionNeeds,
      technical: false
  }
    
  console.log('oi');
    this.outlookScheduler
      .scheduleLightningTalkInPeopleCalendar(this.loggedUserData, lightningTalk)
      .subscribe(suc=> { this.status.calendar="Evento criado no calendário da galera" },
                 err=> this.status.calendar="Ocorreu um erro ao criar o evento no calendário");
    this.scheduleTranmissionService.scheduleTransmitionSupport(lightningTalk)
      .subscribe(suc=> { this.status.tranmission="Tramissão agendada com sucesso" }, 
                  err=> this.status.tranmission="Ocorreu um erro ao agendar a tranmissão")
  
    this.formLt.reset();  
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

  private endTimeGreatherThanStartTimeValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const startTime = this.getInputTimeAsSeconds(control.get('startTime').value);
      const endTime = this.getInputTimeAsSeconds(control.get('endTime').value);

      return startTime >= endTime ? { 'endTimeGreatherThanStartTime': true } : null;
    };
  }

  private getInputTimeAsSeconds(formattedTime:String): Number {
    const values = formattedTime.split(':');
    return parseInt(values[0]) * 60 + parseInt(values[1]);
  }
}
