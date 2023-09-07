import { Component, OnInit } from '@angular/core';
import { fromEvent, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //wait 3 seconds to initiate and then it goes 1 second and on
    const interval$ = timer(3000,1000);
    const sub = interval$.subscribe(val => console.log(`stream 01: ${val}`))

    setTimeout(()=>{
      sub.unsubscribe()
    },5000)

    // click observable
    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      evt => console.log(evt),
      err => console.log(err),
      () => console.log('completed')
    );
  }

}
