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
    function SidebarComponent(router, service) {
        this.router = router;
        this.service = service;
        this.menus = [
            {
                name: 'Người dùng',
                url: '',
                icon: 'user',
                childs: [
                    { name: 'Quản lý người dùng', url: 'user/user' },
                    { name: 'Đăng xuất', url: '' },
                    { name: 'Đăng nhập', url: '/login' },
                ]
            },
            {
                name: 'Hàng hóa',
                url: '',
                icon: 'signal',
                childs: [
                    { name: 'Quản lý đơn hàng', url: '/product/order' },
                    { name: 'Quản lý loại hàng', url: '/product/type' },
                    { name: 'Quản lý sản phẩm', url: '/product/product' },
                ]
            },
        ];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getuserprofile().subscribe(function (res) {
            _this.userDetails = res;
            console.log(res);
        }, function (err) {
            console.log(err);
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
