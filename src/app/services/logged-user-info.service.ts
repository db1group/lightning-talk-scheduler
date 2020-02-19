import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggedUserData } from '../model/logged-user-data';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserInfoService {

  constructor(private _httpClient:HttpClient) { }

  public getLoggedUserInfo(): Observable<LoggedUserData> {
    var userInfo:LoggedUserData = {
      name: "Impossible to resolve the name",
      photo: ""
    };

    return new Observable(observer => {
      var loggedUserGeneralInfo = this._httpClient
        .get("https://graph.microsoft.com/v1.0/me", {})
        .pipe(tap(retrievedUserInfo => userInfo.name = retrievedUserInfo['displayName']));

      var loggedUserPhoto = this._httpClient
        .get("https://graph.microsoft.com/v1.0/me/photo/$value", { responseType: 'blob' })
        .pipe(tap(
          retrievedPhoto => {
            var reader = new FileReader();
            reader.readAsDataURL(retrievedPhoto); 
            reader.onloadend = function() {
              userInfo.photo = reader.result.toString();
          }
        }));

      forkJoin([loggedUserGeneralInfo, loggedUserPhoto])
        .subscribe(val => {
          observer.next(userInfo);
          observer.complete();
        }, alert);
    });
  }
}
