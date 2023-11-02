import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Course } from '../model/course'
import { Observable, concat, fromEvent } from 'rxjs'
import {
    map,
    tap,
    debounceTime,
    distinctUntilChanged,
    switchMap,
} from 'rxjs/operators'
import { Lesson } from '../model/lesson'
import { createHttpObservable } from '../utils/httpObservable'

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
    course$: Observable<Course[]>
    lessons$: Observable<Lesson[]>
    public courseId: string

    @ViewChild('searchInput', { static: true }) input: ElementRef

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id']
        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
    }

    ngAfterViewInit() {
        const searchedLessons$ = fromEvent<any>(
            this.input.nativeElement,
            'keyup'
        ).pipe(
            map((event) => event.target.value),
            debounceTime(400), // wait 400 miliseconds until log it to the console
            distinctUntilChanged(), // prevent duplicates values in output
            switchMap((search) => this.loadLessons(search)) // only send the last emmited values, cancelling the others
        )

        const initialLessons$ = (this.lessons$ = this.loadLessons())

        this.lessons$ = concat(initialLessons$, searchedLessons$)
    }

    loadLessons(search: string = ''): Observable<Lesson[]> {
        const url = `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
        return createHttpObservable(url).pipe(
            tap(console.log),
            map((res) => res['payload'])
        )
    }
}
