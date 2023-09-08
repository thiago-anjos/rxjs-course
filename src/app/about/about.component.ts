import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../utils/httpObservable';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(
        // map(res => res["payload"])
        map(res => Object.values(res["payload"])) // is the same above
    )

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('complete')
    )
  }
}