import { Component, OnInit } from '@angular/core'
import { concat, forkJoin, noop, of, interval, Subject } from 'rxjs'
import { createHttpObservable } from '../utils/httpObservable'

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        const subject = new Subject()

        const series$ = subject.asObservable()

        series$.subscribe((x) => console.log('first subscription', x))

        subject.next(1)
        subject.next(2)
        subject.next(3)

        //imagine that the stream of data still is emitting values
        //subject.complete()

        //after some time, later of the last subscription
        //happen another subscription
        // if not occur another emission the latest subscription will not receive anything
        setTimeout(() => {
            series$.subscribe((x) => console.log('second subscription', x))
        }, 3000)
    }
}
