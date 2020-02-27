import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedUserData } from '../model/logged-user-data';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserInfoService {

  constructor(private _httpClient:HttpClient, private authService: MsalService) { }

  public getLoggedUserInfo(): Observable<LoggedUserData> {
    var userInfo:LoggedUserData = {
      name: "Impossible to resolve the name",
      photo: ""
    };

    return new Observable(observer => {
      userInfo.name = this.authService.getUser().name;
      
      this._httpClient
        .get("https://graph.microsoft.com/v1.0/me/photo/$value", { responseType: 'blob' })
        .subscribe(retrievedPhoto => {
            var reader = new FileReader();
            reader.readAsDataURL(retrievedPhoto); 
            reader.onloadend = function() {
              userInfo.photo = reader.result.toString();
          }
        }, (err) => {
          if (!userInfo.photo) {
            userInfo.photo = 'assets/wally.png';
          }
        }).add(() => {
          observer.next(userInfo);
          observer.complete();
        });
   });
  }
}
