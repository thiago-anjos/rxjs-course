import { Component, OnInit } from '@angular/core'
import { concat, forkJoin, noop, of } from 'rxjs'
import { map, delay } from 'rxjs/operators'
import { createHttpObservable } from '../utils/httpObservable'

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        const source1$ = of(1, 2, 3)
        const source2$ = of(4, 5, 6)

        // concat operator does sequencial call to observables
        const result$ = concat(source1$, source2$)

        result$.subscribe((result) => console.log(result))

        // o forkjoin é o mais indicado para requisições http, porque além de ser paralelo, ele sempre mostrará o último stream de dados
        // no caso teremos 8 e 6 no console.log
        const source3$ = of(5, 6, 7, 8).pipe(delay(2000))

        const source4$ = of(4, 5, 6)

        forkJoin([source3$, source4$]).subscribe(([res1, res2]) => {
            console.log(res1)
            console.log(res2)
        })
    }
}
