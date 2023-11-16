import { Component, OnInit } from '@angular/core'
import { Course } from '../model/course'
import { Observable } from 'rxjs'
import { ADVANCED, BEGINNER } from '../common/constants'
import { Store } from '../common/store.service'

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    beginnersCourses$: Observable<Course[]>
    advancedCourses$: Observable<Course[]>

    constructor(private store: Store) {}

    ngOnInit() {
        const courses$ = this.store.courses$
        this.beginnersCourses$ = this.store.filterByCategory(BEGINNER)
        this.advancedCourses$ = this.store.filterByCategory(ADVANCED)
    }
}
