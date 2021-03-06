"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var UserPermissionService = (function () {
    /**
     * Setting up the default configs
     */
    function UserPermissionService(http) {
        this.http = http;
        /*
         Depending on the project, the correct domain must be changed using setDomain() method preferentially on the CoreModule project,
         or the domain must be seted every request using the @param config({ resource: 'whatever', domain: 'hcm' })
         from the getPermissionTo() method
        */
        this.domain = 'hcm';
        /*
         Depending on the project, the correct service must be changed using setService() method preferentially on the CoreModule project,
         or the domain must be seted every request using the @param config({ resource: 'whatever', service: 'pulse' })
         from the getPermissionTo() method
        */
        this.service = 'service';
        /*
         Depending on the project, the correct service must be changed using setLevel() method preferentially on the CoreModule project,
         or the domain must be seted every request using the @param config({ resource: 'whatever', level: 'actions' })
         from the getPermissionTo() method
        */
        this.level = 'actions';
        //this values shouldn't be changed
        this.platformUrl = this.getServiceUrl();
        this.authUrl = 'res://senior.com.br/';
    }
    UserPermissionService.prototype.setDomain = function (domain) {
        this.domain = domain;
    };
    UserPermissionService.prototype.setService = function (service) {
        this.service = service;
    };
    UserPermissionService.prototype.setLevel = function (level) {
        this.level = level;
    };
    /**
     * Default method for getting actions permissions accordingly with the current user
     * OBS: to run in development mode it's necessary to change it using the setDevelopmentMode method
     * @param action - an action or an array of actions which will be used to return wheather the user has or hasn't permission upon this action(s)
     * @param config - used to override the 'this' config above which contains the url, user, resource, domain, service and so on.
     */
    UserPermissionService.prototype.getPermissionTo = function (action, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (!action)
            console.log("You must specify an action");
        if (!config['resource'])
            console.log("You must specify a 'resource' attribute");
        //optionals
        var platformUrl = config['platformUrl'] || this.platformUrl;
        var authURL = config['authUrl'] || this.authUrl;
        var domainUrl = (config['domain'] || this.domain) + '/' + (config['service'] || this.service);
        var level = config['level'] || this.level;
        //not optionals
        var resource = config['resource'];
        //build params
        var endPoint = platformUrl + 'usuarios/userManager/' + level + '/verificaPermissao';
        var nomeUsuario = this.getPlatformUserData().username;
        var uriRecurso = authURL + domainUrl + '/' + resource;
        if (Array.isArray(action)) {
            var isBack = 0;
            var isRejected = false;
            var permissions = {};
            var requests_1 = [];
            action.forEach(function (ac) {
                var params = { nomeUsuario: nomeUsuario, uriRecurso: uriRecurso, nomeAcao: ac };
                requests_1.push(_this.http.post(endPoint, params)
                    .map(function (response) {
                    var permissions = {};
                    permissions[ac.toLowerCase()] = response.json().permitido;
                    return permissions;
                })
                    .catch(function (error) { return Observable_1.Observable.throw(error); }));
            });
            //send requests
            return Observable_1.Observable.forkJoin(requests_1);
        }
        else {
            var params = { nomeUsuario: nomeUsuario, uriRecurso: uriRecurso, nomeAcao: action };
            //send unique request
            return this.http.post(endPoint, params)
                .map(function (response) {
                var permissions = {};
                permissions[action.toLowerCase()] = response.json().permitido;
                return permissions;
            })
                .catch(function (error) { return Observable_1.Observable.throw(error); });
        }
    };
    /**
     * Method to get the data from the platform services url
     */
    UserPermissionService.prototype.getServiceUrl = function () {
        try {
            return decodeURIComponent(this.getCookieValue("com.senior.pau.services.url"));
        }
        catch (e) {
            console.log("Erro ao obter Service URL");
        }
        return null;
    };
    /**
     * Method to get the data from the current logged user
     */
    UserPermissionService.prototype.getPlatformUserData = function () {
        /*
          In previous versions of the platform we need to double parse the userData cookies,
          but in newest vesrions wee do not need to do this anymore
        */
        var userData = (this.getCookieValue('com.senior.pau.userdata') || '{}');
        userData = JSON.parse(decodeURIComponent(userData.replace(/\+/g, " ")));
        return typeof userData === 'object' ? userData : JSON.parse(userData);
    };
    UserPermissionService.prototype.getCookieValue = function (key) {
        var value = document.cookie.split(";")
            .find(function (value) { return value.indexOf(key) >= 0; });
        return value.split("=")[1];
    };
    return UserPermissionService;
}());
UserPermissionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserPermissionService);
exports.UserPermissionService = UserPermissionService;
//# sourceMappingURL=my-lib.service.js.map