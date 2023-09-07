import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const interval$ = interval(1000);
    interval$.subscribe(val => console.log(`stream 01: ${val}`))
    interval$.subscribe(val => console.log(`stream 02: ${val}`))
  }

}
