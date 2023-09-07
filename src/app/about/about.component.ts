import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, noop, timer } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = new Observable((subscriber)=>{
      fetch('api/courses')
        .then(res =>{
          return res.json()
        })
        .then(body =>{
          subscriber.next(body)
          subscriber.complete();
        })
        .catch(err =>{
          subscriber.error(err)
        })
    })

    http$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('complete')
    )

  }

}
