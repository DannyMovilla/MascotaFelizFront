import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMapTo, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagePayload } from '../interfaces/notifacation-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          //console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          //console.error(error);
        }
      );
  }

  listen() {
    this.afMessaging.messages.subscribe((message) => {
      //console.log(message);
    });
  }
}
