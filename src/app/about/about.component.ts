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

        series$.subscribe(console.log)

        subject.next(1)
        subject.next(2)
        subject.next(3)
        subject.complete()
    }
}
