"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListEmployeeComponent = void 0;
var core_1 = require("@angular/core");
var XLSX = require("xlsx");
var ListEmployeeComponent = /** @class */ (function () {
    function ListEmployeeComponent(service, toastr) {
        this.service = service;
        this.toastr = toastr;
        this.page = 1;
        this.foods = [
            { value: 'HK1-2018-2019', viewValue: 'Học kỳ 1 - Năm Học 2018-2019' },
            { value: 'HK2-2018-2019', viewValue: 'Học kỳ 2- Năm Học 2018-2019' },
            { value: 'HK1-2019-2020', viewValue: 'Học kỳ 1 - Năm Học 2019-2020' },
            { value: 'HK2-2019-2020', viewValue: 'Học kỳ 2 - Năm Học 2019-2020' },
            { value: 'HK1-2020-2021', viewValue: 'Học kỳ 1 - Năm Học 2020-2021' },
            { value: 'HK2-2020-2021', viewValue: 'Học kỳ 2 - Năm Học 2020-2021' },
        ];
    }
    ListEmployeeComponent.prototype.ngOnInit = function () {
        this.service.getEmployees();
    };
    //import excel
    ListEmployeeComponent.prototype.onFileChange = function (evt) {
        var _this = this;
        var target = evt.target;
        if (target.files.length !== 1)
            throw new Error('vui lòng chọn lại');
        var reader = new FileReader();
        reader.onload = function (e) {
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, { type: 'binary' });
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            console.log(ws);
            _this.dataExcel = XLSX.utils.sheet_to_json(ws, { header: 1 });
        };
        reader.readAsBinaryString(target.files[0]);
        console.log(this.dataExcel);
    };
    ListEmployeeComponent.prototype.updateValue = function (value) {
        this.subsl = value;
    };
    ListEmployeeComponent = __decorate([
        core_1.Component({
            selector: 'app-list-employee',
            templateUrl: './list-employee.component.html',
            styleUrls: ['./list-employee.component.css']
        })
    ], ListEmployeeComponent);
    return ListEmployeeComponent;
}());
exports.ListEmployeeComponent = ListEmployeeComponent;
