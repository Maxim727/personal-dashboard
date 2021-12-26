import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationData } from './notifaction-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$: Subject<NotificationData> = new Subject()

  get notifications(){
    return this.notification$.asObservable()
  }

  constructor() { }

  // = 2000 set to default value
  show(text: string, duration = 2000){
    this.notification$.next({text, duration})
  }
}
