import { Observable } from 'rxjs'
import { Course } from '../model/course'

export function createHttpObservable(url: string) {
    return new Observable<Course[]>((subscriber) => {
        const controller = new AbortController()
        const signal = controller.signal

        fetch(url, { signal })
            .then((res) => {
                return res.ok ? res.json() :  subscriber.error(`Request failure ${res.status}`)
            })
            .then((body) => {
                subscriber.next(body)
                subscriber.complete()
            })
            .catch((err) => {
                subscriber.error(err)
            })
        return () => controller.abort()
    })
}
