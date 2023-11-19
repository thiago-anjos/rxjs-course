import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Course } from '../model/course'
import { Observable, concat, forkJoin, fromEvent } from 'rxjs'
import {
    map,
    tap,
    debounceTime,
    distinctUntilChanged,
    switchMap,
    startWith,
} from 'rxjs/operators'
import { Lesson } from '../model/lesson'
import { createHttpObservable } from '../utils/httpObservable'
import { Store } from '../common/store.service'

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit, AfterViewInit {
    course$: Observable<Course>
    lessons$: Observable<Lesson[]>
    public courseId: number

    @ViewChild('searchInput', { static: true }) input: ElementRef

    constructor(private route: ActivatedRoute, private store: Store) {}

    ngOnInit() {
        this.courseId = this.route.snapshot.params['id']
        this.course$ = this.store.selectCourse(this.courseId)

        forkJoin([this.course$, this.loadLessons()]).subscribe(console.log)
    }

    ngAfterViewInit() {
        this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
            map((event) => event.target.value),
            startWith(''),
            debounceTime(400), // wait 400 miliseconds until log it to the console
            distinctUntilChanged(), // prevent duplicates values in output
            switchMap((search) => this.loadLessons(search)) // only send the last emmited values, cancelling the others
        )
    }

    loadLessons(search: string = ''): Observable<Lesson[]> {
        const url = `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
        return createHttpObservable(url).pipe(
            tap(console.log),
            map((res) => res['payload'])
        )
    }
}
