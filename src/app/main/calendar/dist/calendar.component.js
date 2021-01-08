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
var XLSX = require("xlsx");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(service, toastr) {
        this.service = service;
        this.toastr = toastr;
        this.thongke = {
            subjectId: '',
            classId: '',
            employeeId: ''
        };
        this.page = 1;
        this.subjects = null;
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
        this.service.getClass();
        this.service.getEmployees();
        this.service.getSubjects();
        this.service.getThongKe(this.CLassid, this.EmployeeId, this.Subjectid);
        // this.service.getAllSubject().subscribe((res) => {
        //   this.subjects = res;
        // });
    };
    CalendarComponent.prototype.onFileChange = function (evt) {
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
    CalendarComponent.prototype.updateValue = function (value) {
        this.subsl = value;
    };
    CalendarComponent.prototype.resetForm = function (form) {
        if (form != null)
            form.resetForm();
        this.service.formData = {
            subjectId: '',
            subjectName: '',
            credit: 0,
            departmentId: ''
        };
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
            token: '',
            role: ''
        };
    };
    CalendarComponent.prototype.onSubmit = function (form) {
        // this.insertRecord(form);
        // this.toastr.success('Thông báo', 'Thao tác thành công');
        // if (form.value.subjectId == null) this.insertRecord(form);
        // else this.updateRecord(form);
        this.service.getThongKe(this.CLassid, this.Subjectid, this.EmployeeId);
        console.log(this.thongke);
    };
    CalendarComponent.prototype.insertRecord = function (form) {
        var _this = this;
        //console.log('ffffffff',form.value);
        this.service.postSubjects(form.value).subscribe(function (res) {
            _this.resetForm(form);
            _this.service.getSubjects();
        }, function (err) {
            console.log(err);
        });
    };
    CalendarComponent.prototype.formdetails = function (sub) {
        this.service.formData = Object.assign({}, sub);
    };
    CalendarComponent.prototype.updateform = function (sub) {
        this.service.formData = Object.assign({}, sub);
    };
    CalendarComponent.prototype.updateRecord = function (form) {
        var _this = this;
        //console.log('ffffffff',form.value);
        this.service.putSubjects(form.value).subscribe(function (res) {
            _this.resetForm(form);
            _this.service.getSubjects();
        }, function (err) {
            console.log(err);
        });
    };
    CalendarComponent.prototype["delete"] = function (id) {
        var _this = this;
        if (confirm('Bạn có chắc chắn muốn xóa không')) {
            this.service.deleteSubject(id).subscribe(function (res) {
                _this.service.getSubjects();
                _this.toastr.warning('Thông báo', 'Thao tác thành công');
            });
        }
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
