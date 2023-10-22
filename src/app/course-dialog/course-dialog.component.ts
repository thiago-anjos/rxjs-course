import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    OnInit,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Course } from '../model/course'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import * as moment from 'moment'
import { fromEvent } from 'rxjs'
import { concatMap, tap, exhaustMap, filter, mergeMap } from 'rxjs/operators'
import { fromPromise } from 'rxjs/internal-compatibility'

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
    form: FormGroup
    course: Course

    @ViewChild('saveButton') saveButton: ElementRef

    @ViewChild('searchInput') searchInput: ElementRef

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course,
        private renderer: Renderer2,
        private el: ElementRef
    ) {
        this.course = course

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required],
        })
    }

    ngOnInit() {
        this.form.valueChanges
            .pipe(
                tap(() => console.log('formulario valido', this.form.valid)),
                // Call pipe to manipulate the stream, then use filter to valid the form, very usefull this technique
                filter(() => this.form.valid),
                // call the saveCourse method with is observables. But concatMap calls then in sequencial, only when the last one has returned
                // that is, it only start the next call, after the last one has returned
                concatMap((changes) => this.saveCourse(changes))
            )
            .subscribe()
    }

    saveCourse(changes) {
        // fromPromisse return an observable from a promisse
        return fromPromise(
            fetch(`api/courses/${this.course.id}`, {
                method: 'PUT',
                body: JSON.stringify(changes),
                headers: {
                    'content-type': 'application/json',
                },
            })
        )
    }

    ngAfterViewInit() {
        const buttonElement = document.querySelector('#savedButton')
        fromEvent(buttonElement, 'click')
            // it prevents multiples requests to the server
            .pipe(exhaustMap(() => this.saveCourse(this.form.value)))
            // it emit multiples requests to the server
            // .pipe(concatMap(() => this.saveCourse(this.form.value)))
            .subscribe()
    }

    save() {
        //console.log('save')
    }

    close() {
        this.dialogRef.close()
    }
}
