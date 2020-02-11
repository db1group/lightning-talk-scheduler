import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { OutlookSchedulerService } from './services/outlook-scheduler.service';
// import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  //private subscription: Subscription;
  public hasLTStatusMessage = false;

  constructor(private broadcastService: BroadcastService, private authService: MsalService, private outlookScheduler: OutlookSchedulerService){

    this.broadcastService.subscribe("msal:loginFailure", (payload) => {
      console.log("failure login", payload)
    });
      
    this.broadcastService.subscribe("msal:loginSuccess", (payload) => {
      console.log("success login", payload);

      this.outlookScheduler
        .createEventInIvosCalendar()
        .subscribe(console.log,console.log);
    });  

    this.broadcastService.subscribe("msal:acquireTokenSuccess", (payload) => {
      console.log("acquire token success", payload)
    });
    
    this.broadcastService.subscribe("msal:acquireTokenFailure", (payload) => {
      console.log("acquire token failure", payload)
    });
    
 
  }


  public logar(){
    this.authService.loginRedirect([
      "https://graph.microsoft.com/User.Read", 
      "https://graph.microsoft.com/Calendars.ReadWrite",
      "https://graph.microsoft.com/Calendars.ReadWrite.Shared",
      "https://graph.microsoft.com/email",
      "https://graph.microsoft.com/profile"
    ]);
  }

  
}
