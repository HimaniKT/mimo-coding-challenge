import { Http,Response  } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LessonService{
    constructor(private http: Http) { }

    configUrl = 'https://file-bzxjxfhcyh.now.sh/';

    getLessons() {
       return this.http.get(this.configUrl)
            .toPromise()
            .then((response : Response) => response.json());
    }

}