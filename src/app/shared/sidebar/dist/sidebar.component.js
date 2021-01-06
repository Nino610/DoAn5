"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router, AuthenticationService, service) {
        this.router = router;
        this.AuthenticationService = AuthenticationService;
        this.service = service;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.employee = localStorage.getItem('employeeId');
        console.log(this.photo);
        //this.employee = 'B1001';
        this.service.getuserprofile().subscribe(function (res) {
            _this.userDetails = res;
            console.log(res);
        }, function (err) {
            console.log(err);
        });
        this.service.getEmployeeByID(this.employee).subscribe(function (res) {
            _this.fullname = res;
            console.log(_this.fullname);
        });
    };
    SidebarComponent.prototype.ngAfterViewInit = function () {
        $('#sidebar-collapse').click(function () {
            setTimeout(function () {
                var event;
                if (typeof Event === 'function') {
                    event = new Event('resize');
                }
                else {
                    event = document.createEvent('Event');
                    event.initEvent('resize', true, true);
                }
                window.dispatchEvent(event);
            }, 100);
            if (!$('#sidebar').hasClass('menu-min')) {
                $('.main-content').css('padding-left', '43px');
                $('.footer-inner').css('left', '43px');
            }
            else {
                $('.main-content').css('padding-left', '190px');
                $('.footer-inner').css('left', '190px');
            }
        });
        setTimeout(function () {
            var event;
            if (typeof Event === 'function') {
                event = new Event('resize');
            }
            else {
                event = document.createEvent('Event');
                event.initEvent('resize', true, true);
            }
            window.dispatchEvent(event);
        }, 100);
        setTimeout(function () {
            $('.main-content').css('padding-left', $('#sidebar').width() + 1);
            $('.footer-inner').css('left', $('#sidebar').width() + 1);
        }, 100);
    };
    SidebarComponent.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    SidebarComponent.prototype.remove = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.userSubject.next(null);
    };
    SidebarComponent.prototype.changePhoto = function () {
        var tmp = {
            employeeId: this.employee,
            fullName: this.userDetails.fullName,
            gender: this.userDetails.gender,
            email: this.userDetails.email,
            departmentId: this.userDetails.departmentId,
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
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
