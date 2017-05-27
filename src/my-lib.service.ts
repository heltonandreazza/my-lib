import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/forkJoin";
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class MyLibService {

    constructor(private http: Http) {
    }

    getGeoNames() {
        return this.http.get('http://www.geonames.org/childrenJSON?geonameId=3469034')
            .map(response => {
                return response.json().geonames;
            });
    }
}