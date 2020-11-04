"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("./../../environments/environment");
var operators_1 = require("rxjs/operators");
var ApiService = /** @class */ (function () {
    function ApiService(_http, router) {
        this._http = _http;
        this.router = router;
        this.host = environment_1.environment.apiUrl;
    }
    ApiService.prototype.post = function (url, obj) {
        var body = JSON.stringify(obj);
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this._http
            .post(this.host + 'url', body, { headers: headerOptions })
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ApiService.prototype.get = function (url) {
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this._http.get(this.host + url, { headers: headerOptions }).pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
