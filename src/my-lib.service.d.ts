import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/forkJoin";
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
export declare class MyLibService {
    private http;
    constructor(http: Http);
    getGeoNames(): Observable<any>;
}
