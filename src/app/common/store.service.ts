import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { createHttpObservable } from '../utils/httpObservable'
import { Course } from '../model/course'

@Injectable({
    providedIn: 'root',
})
export class Store {
    private subject = new BehaviorSubject<Course[]>([])

    courses$: Observable<Course[]> = this.subject.asObservable()

    init() {
        const http$ = createHttpObservable('/api/courses')
        http$
            .pipe(map((res) => Object.values(res['payload'])))
            .subscribe((courses: Course[]) => this.subject.next(courses))
    }

    filterByCategory(category: string) {
        return this.courses$.pipe(
            map((courses) =>
                courses.filter((course: Course) => course.category === category)
            )
        )
    }
}
