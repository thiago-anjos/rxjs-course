import { Observable } from 'rxjs'
import { Course } from '../model/course'

export function createHttpObservable(url: string) {
    return new Observable<Course[]>((subscriber) => {
        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((body) => {
                subscriber.next(body)
                subscriber.complete()
            })
            .catch((err) => {
                subscriber.error(err)
            })
    })
}
