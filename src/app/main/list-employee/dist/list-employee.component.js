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
    ListEmployeeComponent.prototype.onSubmit = function (form) {
        this.insertRecord(form);
        this.toastr.success('Thông báo', 'Thao tác thành công');
        if (form.value.employeeId == null)
            this.insertRecord(form);
        else
            this.updateRecord(form);
    };
    ListEmployeeComponent.prototype.resetForm = function (form) {
        if (form != null)
            form.resetForm();
        this.service.formDataEmployee = {
            employeeId: '',
            departmentId: '',
            fullName: '',
            gender: true,
            birthday: '',
            address: '',
            email: '',
            phoneNumber: '',
            password: '',
            photo: '',
            role: ''
        };
    };
    ListEmployeeComponent.prototype.insertRecord = function (form) {
        var _this = this;
        //console.log('ffffffff',form.value);
        this.service.postEmployees(form.value).subscribe(function (res) {
            _this.resetForm(form);
            _this.service.getEmployees();
        }, function (err) {
            console.log(err);
        });
    };
    ListEmployeeComponent.prototype.updateRecord = function (form) {
        var _this = this;
        //console.log('ffffffff',form.value);
        this.service.putEmployees(form.value).subscribe(function (res) {
            _this.resetForm(form);
            _this.service.getEmployees();
        }, function (err) {
            console.log(err);
        });
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
    //for chi tiết để sửa
    //Object.assign() được sử dụng để sao chép các giá trị của tất cả thuộc tính có thể liệt kê từ một hoặc nhiều đối tượng nguồn đến một đối tượng đích. Nó sẽ trả về đối tượng đích đó.
    ListEmployeeComponent.prototype.formdetails = function (empl) {
        this.service.formDataEmployee = Object.assign({}, empl);
    };
    ListEmployeeComponent.prototype.updateform = function (empl) {
        this.service.formDataEmployee = Object.assign({}, empl);
    };
    ListEmployeeComponent.prototype.updateValue = function (value) {
        this.subsl = value;
    };
    ListEmployeeComponent.prototype["delete"] = function (id) {
        var _this = this;
        if (confirm('Bạn có chắc chắn muốn xóa không')) {
            this.service.deleteEmployees(id).subscribe(function (res) {
                _this.service.getEmployees();
                _this.toastr.warning('Thông báo', 'Thao tác thành công');
            });
        }
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
