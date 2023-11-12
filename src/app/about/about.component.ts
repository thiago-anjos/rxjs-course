import { Component, OnInit } from '@angular/core'
import {
    concat,
    forkJoin,
    noop,
    of,
    interval,
    Subject,
    BehaviorSubject,
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
        const subject = new BehaviorSubject(0)

        const series$ = subject.asObservable()

        series$.subscribe((x) => console.log('first subscription', x))

        subject.next(1)
        subject.next(2)
        subject.next(3)
        //subject.complete()

        setTimeout(() => {
            // Even this subscription is latest it will receive the last emmited value that is 3
            series$.subscribe((x) => console.log('second subscription', x))
            // if there is another emitted value
            subject.next(4)
            // the two subscriptions will received it;
        }, 3000)
    }
}
