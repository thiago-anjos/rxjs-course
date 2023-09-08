import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../utils/httpObservable';
import { noop } from 'rxjs';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses: Course[];
    advancedCourses: Course[];

    constructor() {}

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const courses$ = http$.pipe(
            // map(res => res["payload"])
            map(res => Object.values(res["payload"])) // is the same above
        )
    
        courses$.subscribe(
          courses => {
            this.beginnersCourses = courses.filter((course: Course) => course.category === "BEGINNER") as any;
            this.advancedCourses = courses.filter((course: Course) => course.category === "ADVANCED") as any;
          },
          noop,
          () => console.log('complete')
        )
    }

}
