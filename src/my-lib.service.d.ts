import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/forkJoin";
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
export declare class UserPermissionService {
    private http;
    private domain;
    private service;
    private platformUrl;
    private authUrl;
    private level;
    /**
     * Setting up the default configs
     */
    constructor(http: Http);
    setDomain(domain: string): void;
    setService(service: string): void;
    setLevel(level: string): void;
    /**
     * Default method for getting actions permissions accordingly with the current user
     * OBS: to run in development mode it's necessary to change it using the setDevelopmentMode method
     * @param action - an action or an array of actions which will be used to return wheather the user has or hasn't permission upon this action(s)
     * @param config - used to override the 'this' config above which contains the url, user, resource, domain, service and so on.
     */
    getPermissionTo(action: any, config?: {}): Observable<any>;
    /**
     * Method to get the data from the platform services url
     */
    private getServiceUrl();
    /**
     * Method to get the data from the current logged user
     */
    private getPlatformUserData();
    private getCookieValue(key);
}
