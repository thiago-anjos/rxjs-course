import { Component, OnInit } from '@angular/core';
import { interval, timer } from 'rxjs';

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
    interval$.subscribe(val => console.log(`stream 01: ${val}`))
    interval$.subscribe(val => console.log(`stream 02: ${val}`))
  }

}
