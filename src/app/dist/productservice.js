"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var core_1 = require("@angular/core");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.status = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
        this.apiUrl = 'https://localhost:44399';
    }
    ProductService.prototype.getEmployees = function () {
        var _this = this;
        this.http
            .get(this.apiUrl + '/api/Employees')
            .toPromise()
            .then(function (res) { return (_this.listEmployees = res); });
        //console.log(this.listEmployees);
    };
    ProductService.prototype.getSubjects = function () {
        var _this = this;
        this.http
            .get(this.apiUrl + '/api/Subjects')
            .toPromise()
            .then(function (res) { return (_this.listSubjects = res); });
    };
    ProductService.prototype.postSubjects = function (formData) {
        formData.credit = +formData.credit; //chuyển định dạng về giống trong models
        return this.http.post(this.apiUrl + '/api/Subjects/them', formData);
    };
    ProductService.prototype.putSubjects = function (formData) {
        formData.credit = +formData.credit;
        return this.http.put(this.apiUrl + '/api/Subjects/sua/' + formData.subjectId, formData);
    };
    ProductService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
