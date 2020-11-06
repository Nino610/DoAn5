"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleGuard = exports.AuthGuard = void 0;
var core_1 = require("@angular/core");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router //private authenticationService: AuthenticationService
    ) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        //const user = this.authenticationService.userValue;
        if (localStorage.getItem('token') != null) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        else
            this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url }
            });
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
var RoleGuard = /** @class */ (function () {
    function RoleGuard(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
    }
    RoleGuard.prototype.canActivate = function (route) {
        var user = this.authenticationService.userValue;
        if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
            this.router.navigate(['/unauthorized']);
            return false;
        }
        return true;
    };
    RoleGuard = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], RoleGuard);
    return RoleGuard;
}());
exports.RoleGuard = RoleGuard;
