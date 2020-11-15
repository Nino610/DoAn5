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
    function AvatarComponent(http) {
        var _this = this;
        this.http = http;
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
