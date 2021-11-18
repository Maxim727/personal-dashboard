import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition('* => *', [
        query(':leave', [
          style({
            display: 'block'
          }),
          animate(300, style({
            opacity: 0
          }))
        ], {optional: true}),
         
        query(':enter', [
        style({
          opacity: 0,
          display: 'block'
        }),
        animate(300, style({
          opacity: 1
        }))
      ], {optional: true})
      ])
    ])
  ]
})
export class AppComponent {
  currentDate = new Date()

  prepareRoute(outlet: RouterOutlet){
    if (outlet.isActivated){
      return outlet.activatedRoute.snapshot.url
    }
    return
    
  }

}
