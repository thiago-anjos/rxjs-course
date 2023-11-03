import { Component, OnInit } from '@angular/core'
import { Course } from '../model/course'
import { Observable, of, throwError, timer } from 'rxjs'
import {
    map,
    shareReplay,
    tap,
    catchError,
    finalize,
    delayWhen,
    retryWhen,
} from 'rxjs/operators'
import { createHttpObservable } from '../utils/httpObservable'

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    beginnersCourses$: Observable<Course[]>
    advancedCourses$: Observable<Course[]>

    constructor() {}

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses')

        const courses$ = http$.pipe(
            // tap(() => console.log('http request executed')),
            // map(res => res["payload"])
            map((res) => Object.values(res['payload'])), // is the same above
            shareReplay(),
            retryWhen((errors) => errors.pipe(delayWhen(() => timer(200))))
        ) as Observable<Course[]>

        this.beginnersCourses$ = courses$.pipe(
            map((courses) =>
                courses.filter(
                    (course: Course) => course.category === 'BEGINNER'
                )
            )
        )
        this.advancedCourses$ = courses$.pipe(
            map((courses) =>
                courses.filter(
                    (course: Course) => course.category === 'ADVANCED'
                )
            )
        )
    }
}
