import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationData } from '../shared/notifaction-data.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notificaiton',
  templateUrl: './notificaiton.component.html',
  styleUrls: ['./notificaiton.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-25px)'
        }),
        // the second value is the dealy
        animate('150ms 120ms ease-out')
      ]),
      transition(':leave', [
        animate(150, style({
          opacity: 0,
          transform: 'scale(0.85)'
        }))
      ]),
    ])
  ]
})
export class NotificaitonComponent implements OnInit {

  notification!: NotificationData[];
  notificationTimeout: any;
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notifcation: NotificationData) =>{
      this.notification = Array(notifcation) 

      clearTimeout(this.notificationTimeout)

      this.notificationTimeout = setTimeout(() => {
        //@ts-ignore
        this.notification = null
      }, 2000);
    })

  }

}
