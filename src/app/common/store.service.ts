import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap, map } from 'rxjs/operators'
import { createHttpObservable } from '../utils/httpObservable'
import { Course } from '../model/course'
import { fromPromise } from 'rxjs/internal-compatibility'

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

    saveCourse(id: number, formChanges: any): Observable<any> {
        const courses = this.subject.getValue()
        const courseIndex = courses.findIndex((course) => course.id === id)

        // create a new array called newCourses, but this array is not a deep copy
        const newCourses = courses.slice(0)

        // get the id of the course witch will be modified
        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...formChanges,
        }

        this.subject.next(newCourses)

        return fromPromise(
            fetch(`/api/courses/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formChanges),
                headers: {
                    'content-type': 'application/json',
                },
            })
        )
    }
}
