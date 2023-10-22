import { Component, OnInit } from '@angular/core'
import { concat, forkJoin, noop, of, interval } from 'rxjs'
import { createHttpObservable } from '../utils/httpObservable'

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        // const interval1$ = interval(1000)
        // const sub = interval1$.subscribe(console.log)
        // setTimeout(() => sub.unsubscribe(), 6000)

        const http$ = createHttpObservable('/api/courses')
        const sub = http$.subscribe(console.log)

        setTimeout(() => {
            sub.unsubscribe()
        }, 0)
    }
}
