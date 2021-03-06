"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var file_not_found_component_1 = require("./shared/file-not-found/file-not-found.component");
var auth_guard_1 = require("./lib/auth.guard");
var login_component_1 = require("./user/login/login.component");
var avatar_component_1 = require("./user/avatar/avatar.component");
var register_component_1 = require("./user/register/register.component");
var admin_component_1 = require("./admin/admin.component");
var forbidden_component_1 = require("./forbidden/forbidden.component");
var thongke_component_1 = require("./thongke/thongke.component");
var routes = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./main/main.module'); }).then(function (m) { return m.MainModule; }); }
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'Avatar',
        component: avatar_component_1.AvatarComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'forbidden',
        component: forbidden_component_1.ForbiddenComponent
    },
    {
        path: 'thongke',
        component: thongke_component_1.ThongkeComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { permittedRoles: ['2'] }
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { permittedRoles: ['1'] }
    },
    {
        path: '**',
        component: file_not_found_component_1.FileNotFoundComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules }),
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
