"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(service, toastr) {
        this.service = service;
        this.toastr = toastr;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.service.formModel.reset();
    };
    RegisterComponent.prototype.onRegister = function () {
        var _this = this;
        this.service.register().subscribe(function (res) {
            if (res.succeded) {
                _this.service.formModel.reset();
            }
            else {
            }
        }, function (err) {
            console.log(err);
        });
        this.toastr.success('Thông báo', 'Thao tác thành công');
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styles: []
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
