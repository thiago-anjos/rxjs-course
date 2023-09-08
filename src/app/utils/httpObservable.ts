import { Observable } from 'rxjs';

export function createHttpObservable(url:string){
    return new Observable((subscriber)=>{
      fetch(url)
        .then(res =>{
          return res.json()
        })
        .then(body =>{
          subscriber.next(body)
          subscriber.complete();
        })
        .catch(err =>{
          subscriber.error(err)
        })
    })
};