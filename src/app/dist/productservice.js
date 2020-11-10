"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProductService = /** @class */ (function () {
    function ProductService(http, fb) {
        this.http = http;
        this.fb = fb;
        this.status = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
        this.apiUrl = 'https://localhost:44399';
        //register
        this.formModel = this.fb.group({
            employeeId: ['', forms_1.Validators.required],
            role: ['', forms_1.Validators.required],
            departmentId: ['', forms_1.Validators.required],
            passwords: this.fb.group({
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
                confirmpassword: ['', forms_1.Validators.required]
            }, { validator: this.comparePassword })
        });
    }
    ProductService.prototype.comparePassword = function (fb) {
        var ConfirmPasswordCheck = fb.get('confirmpassword');
        if (ConfirmPasswordCheck.errors == null ||
            'CheckPassGiongNhau' in ConfirmPasswordCheck.errors) {
            if (fb.get('password').value != ConfirmPasswordCheck.value)
                ConfirmPasswordCheck.setErrors({ CheckPassGiongNhau: true });
            else
                ConfirmPasswordCheck.setErrors(null);
        }
    };
    ProductService.prototype.register = function () {
        var body = {
            username: this.formModel.value.username,
            role: this.formModel.value.role,
            departmentId: this.formModel.value.departmentId,
            password: this.formModel.value.passwords.password
        };
        return this.http.post(this.apiUrl + '/api/Accounts/Them', body);
    };
    //login
    ProductService.prototype.login = function (formData) {
        console.log(formData);
        return this.http.post(this.apiUrl + '/api/Accounts/Login', formData);
    };
    //tài khoản
    ProductService.prototype.getuserprofile = function () {
        var tokenHeader = new http_1.HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token')
        });
        console.log(tokenHeader);
        return this.http.get(this.apiUrl + '/api/UserProfile', {
            headers: tokenHeader
        });
    };
    // employees: giảng viên
    ProductService.prototype.getEmployees = function () {
        var _this = this;
        this.http
            .get(this.apiUrl + '/api/Employees')
            .toPromise()
            .then(function (res) { return (_this.listEmployees = res); });
        console.log(this.listEmployees);
    };
    ProductService.prototype.putEmployees = function (formDataEmployee) {
        //formData.phoneNumber = +formData.phoneNumber;
        return this.http.put(this.apiUrl + '/api/Employees/sua/' + formDataEmployee.employeeId, formDataEmployee);
    };
    // subject: môn học
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
    ProductService.prototype.deleteSubject = function (id) {
        return this.http["delete"](this.apiUrl + '/api/Subjects/xoa/' + id);
    };
    ProductService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
