"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileUserComponent = void 0;
var core_1 = require("@angular/core");
var ProfileUserComponent = /** @class */ (function () {
    function ProfileUserComponent(service, toastr, router) {
        this.service = service;
        this.toastr = toastr;
        this.router = router;
    }
    ProfileUserComponent.prototype.ngOnInit = function () {
        //JSON.stringify(this.service.getuserprofile());
        var _this = this;
        this.service.getuserprofile().subscribe(function (res) {
            _this.userDetails = res;
            //this.userDetails = this.service.formDataEmployee;
            console.log(res);
            //console.log(this.service.formDataEmployee);
        }, function (err) {
            console.log(err);
        });
    };
    ProfileUserComponent.prototype.updateRecord = function (form) {
        var _this = this;
        //console.log('ffffffff',form.value);
        this.service.putuserprofile(form.value).subscribe(function (res) {
            _this.userDetails = res;
            _this.userDetails = _this.service.formDataEmployee;
            _this.resetForm(form);
            _this.service.getuserprofile();
        }, function (err) {
            console.log(err);
        });
    };
    ProfileUserComponent.prototype.resetForm = function (form) {
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
            token: '',
            role: ''
        };
    };
    ProfileUserComponent.prototype.updateform = function (sub) {
        this.service.formDataEmployee = Object.assign({}, sub);
    };
    ProfileUserComponent.prototype.onSubmit = function (form) {
        //this.insertRecord(form);
        //this.toastr.success('Thông báo', 'Thao tác thành công');
        this.updateRecord(form);
    };
    ProfileUserComponent = __decorate([
        core_1.Component({
            selector: 'app-profile-user',
            templateUrl: './profile-user.component.html',
            styleUrls: ['./profile-user.component.css']
        })
    ], ProfileUserComponent);
    return ProfileUserComponent;
}());
exports.ProfileUserComponent = ProfileUserComponent;
