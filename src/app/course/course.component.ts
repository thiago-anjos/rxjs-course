import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Course } from '../model/course'
import { Observable, fromEvent } from 'rxjs'
import { map, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators'
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

    @ViewChild('searchInput', { static: true }) input: ElementRef

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const courseId = this.route.snapshot.params['id']
        this.course$ = createHttpObservable(`/api/courses/${courseId}`)

        this.lessons$ = createHttpObservable(
            `/api/lessons?courseId=${courseId}`
        ).pipe(
            tap(console.log),
            map((res) => res['payload'])
        )
    }

    ngAfterViewInit() {
        fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map((event) => event.target.value),
                debounceTime(400), // wait 400 miliseconds until log it to the console
                distinctUntilChanged() // prevent duplicates values in output
            )
            .subscribe(console.log)
    }
}
