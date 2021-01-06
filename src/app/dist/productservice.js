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
var operators_1 = require("rxjs/operators");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json'
    })
};
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
        //var name = localStorage.getItem('token');
        console.log(tokenHeader);
        return this.http.get(this.apiUrl + '/api/UserProfile', {
            headers: tokenHeader
        });
    };
    ProductService.prototype.putuserprofile = function (formDataEmployee) {
        var tokenHeader = new http_1.HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.put(this.apiUrl + '/api/Employees/sua/' + this.formDataEmployee.employeeId, {
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
    ProductService.prototype.getEmployeeByID = function (id) {
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this.http
            .get('http://localhost:44399/api/Employees/' + id, {
            headers: headerOptions
        })
            .pipe(operators_1.first());
    };
    // getAllSubject() : Observable<any>{
    //   let cloneHeader: any = {};
    //   cloneHeader['Content-Type'] = 'application/json';
    //   const headerOptions = new HttpHeaders(cloneHeader);
    //   return this.http.get(this.apiUrl + '/api/Employees', { headers: headerOptions }).pipe(first());
    // }
    // subject: môn học
    ProductService.prototype.getSubjects = function () {
        var _this = this;
        this.http
            .get(this.apiUrl + '/api/Subjects')
            .toPromise()
            .then(function (res) { return (_this.listSubjects = res); });
    };
    ProductService.prototype.getDetailsSubjects = function (formData) {
        var _this = this;
        this.http
            .get(this.apiUrl + '/api/Subjects' + formData.subjectId)
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
    // phiếu khảo sát
    ProductService.prototype.getAllPhieuKhaoSatSv = function () {
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this.http
            .get('http://localhost:44399/api/Questions/Sv', {
            headers: headerOptions
        })
            .pipe(operators_1.first());
    };
    ProductService.prototype.GetPlanByID = function (id) {
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this.http
            .get('http://localhost:44399/api/Plans/' + id, { headers: headerOptions })
            .pipe(operators_1.first());
    };
    ProductService.prototype.getAllPhieuKhaoSatGv = function () {
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this.http
            .get('http://localhost:44399/api/Questions/Gv', {
            headers: headerOptions
        })
            .pipe(operators_1.first());
    };
    ProductService.prototype.postAnswer = function (order) {
        var url = this.apiUrl + "/api/Answers";
        var orderString = JSON.stringify(order);
        return this.http.post(url, orderString, httpOptions);
    };
    ProductService.prototype.getStudentByID = function (id) {
        var cloneHeader = {};
        cloneHeader['Content-Type'] = 'application/json';
        var headerOptions = new http_1.HttpHeaders(cloneHeader);
        return this.http
            .get('http://localhost:44399/api/Employees/' + id, {
            headers: headerOptions
        })
            .pipe(operators_1.first());
    };
    ProductService.prototype.UpdateInfor = function (id, student) {
        var url = this.apiUrl + "/api/Employees/" + id;
        var studentString = JSON.stringify(student);
        return this.http.put(url, studentString, httpOptions);
    };
    ProductService.prototype.update = function (id, data) {
        return this.http.put(this.apiUrl + "/api/Employees/put/" + id, data);
    };
    Object.defineProperty(ProductService.prototype, "valueUser", {
        get: function () {
            return this.frmstudent;
            console.log(this.frmstudent);
        },
        enumerable: false,
        configurable: true
    });
    ProductService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
