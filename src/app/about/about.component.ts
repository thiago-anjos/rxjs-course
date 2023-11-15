import { Component, OnInit } from '@angular/core'
import {
    concat,
    forkJoin,
    noop,
    of,
    interval,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject,
} from 'rxjs'
import { createHttpObservable } from '../utils/httpObservable'

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        const subject = new ReplaySubject()

        const series$ = subject.asObservable()

        series$.subscribe((x) => console.log('first subscription', x))

        subject.next(1)
        subject.next(2)
        subject.next(3)

        //AsyncSubject only emit the last value, so it will be 3
        // And only emit if the complete() method is called

        //do not need the complete finish to emmit the values
        //subject.complete()

        setTimeout(() => {
            series$.subscribe((x) => console.log('second subscription', x))
            // it will be emitted for the first and second subscription
            subject.next(4)
        }, 3000)
    }
}
