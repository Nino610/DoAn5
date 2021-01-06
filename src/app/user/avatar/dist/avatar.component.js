"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AvatarComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var AvatarComponent = /** @class */ (function () {
    function AvatarComponent(http, service) {
        var _this = this;
        this.http = http;
        this.service = service;
        this.apiUrl = 'https://localhost:44399';
        this.onUploadFinished = new core_1.EventEmitter();
        this.uploadedFiles = function (files) {
            if (files.length === 0)
                return;
            var fileToUpload = files[0];
            var formData = new FormData();
            formData.append('file', fileToUpload, fileToUpload.name);
            _this.http
                .post(_this.apiUrl + '/api/UserProfile/upload', formData, {
                reportProgress: true,
                observe: 'events'
            })
                .subscribe(function (event) {
                if (event.type === http_1.HttpEventType.UploadProgress) {
                    _this.progress = Math.round((100 * event.loaded) / event.total);
                }
                else if (event.type === http_1.HttpEventType.Response) {
                    _this.message = 'Upload Successful';
                    _this.onUploadFinished.emit(event.body);
                }
            });
        };
    }
    AvatarComponent.prototype.ngOnInit = function () { };
    AvatarComponent.prototype.changePhoto = function () {
        var tmp = {
            employeeId: this.employee,
            fullName: this.userDetails.fullName,
            gender: this.userDetails.gender,
            email: this.userDetails.email,
            departmentId: this.userDetails.departmentId,
            classId: this.userDetails.classId,
            "class": this.userDetails["class"],
            scores: this.userDetails.scores,
            photo: this.photo,
            password: this.userDetails.password,
            phoneNumber: this.userDetails.phoneNumber,
            birthday: this.userDetails.birthday,
            address: this.userDetails.address
        };
        this.service.update(this.employee, tmp).subscribe(function (res) {
            alert('Update thành công');
        }, function (error) {
            console.log(error);
        });
    };
    __decorate([
        core_1.Output()
    ], AvatarComponent.prototype, "onUploadFinished");
    AvatarComponent = __decorate([
        core_1.Component({
            selector: 'app-avatar',
            templateUrl: './avatar.component.html',
            styleUrls: ['./avatar.component.css']
        })
    ], AvatarComponent);
    return AvatarComponent;
}());
exports.AvatarComponent = AvatarComponent;
