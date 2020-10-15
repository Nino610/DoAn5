"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CalendarComponent = void 0;
var core_1 = require("@angular/core");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(productService) {
        this.productService = productService;
        this.foods = [
            { value: 'HK1-2018-2019', viewValue: 'Học kỳ 1 - Năm Học 2018-2019' },
            { value: 'HK2-2018-2019', viewValue: 'Học kỳ 2- Năm Học 2018-2019' },
            { value: 'HK1-2019-2020', viewValue: 'Học kỳ 1 - Năm Học 2019-2020' },
            { value: 'HK2-2019-2020', viewValue: 'Học kỳ 2 - Năm Học 2019-2020' },
            { value: 'HK1-2020-2021', viewValue: 'Học kỳ 1 - Năm Học 2020-2021' },
            { value: 'HK2-2020-2021', viewValue: 'Học kỳ 2 - Năm Học 2020-2021' },
        ];
    }
    CalendarComponent.prototype.ngOnInit = function () {
    };
    CalendarComponent.prototype.openNew = function () {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    };
    CalendarComponent.prototype.hideDialog = function () {
        this.productDialog = false;
        this.submitted = false;
    };
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'app-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.css']
        })
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
