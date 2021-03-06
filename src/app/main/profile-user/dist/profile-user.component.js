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
    function ProfileUserComponent(service, toastr, router, messageService) {
        this.service = service;
        this.toastr = toastr;
        this.router = router;
        this.messageService = messageService;
        this.submitted = false;
    }
    ProfileUserComponent.prototype.ngOnInit = function () {
        //JSON.stringify(this.service.getuserprofile());
        var _this = this;
        this.service.getuserprofile().subscribe(function (res) {
            _this.userDetails = res;
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    ProfileUserComponent.prototype.Update = function () {
        var _this = this;
        this.submitted = true;
        var tmp = {
            employeeId: this.userDetails.employeeId,
            departmentId: this.userDetails.departmentId,
            fullName: this.userDetails.fullName,
            gender: this.userDetails.gender,
            birthday: this.userDetails.birthday,
            address: this.userDetails.address,
            email: this.userDetails.email,
            phoneNumber: this.userDetails.phoneNumber,
            password: this.userDetails.password,
            photo: this.userDetails.photo
        };
        this.service.update(this.userDetails.employeeId, tmp).subscribe(function (res) {
            _this.messageService.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: 'Sửa thông tin thành công'
            });
        }, function (error) {
            console.log(error);
        });
    };
    ProfileUserComponent.prototype.updateRecord = function (form) {
        var _this = this;
        //console.log('ffffffff',form.value);
        this.service.putuserprofile(form.value).subscribe(function (res) {
            _this.userDetails = res;
            //this.userDetails = this.service.formDataEmployee;
            _this.service.getuserprofile();
        }, function (err) {
            console.log(err);
        });
    };
    ProfileUserComponent.prototype.updateform = function (sub) {
        this.service.formDataEmployee = Object.assign({}, sub);
    };
    ProfileUserComponent.prototype.onSubmit = function (form) {
        //this.insertRecord(form);
        //this.toastr.success('Thông báo', 'Thao tác thành công');
        this.Update();
        this.toastr.success('Thông báo', 'Thao tác thành công');
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
