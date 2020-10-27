"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AppRoutingModule = void 0;

var core_1 = require("@angular/core");

var router_1 = require("@angular/router");

var login_component_1 = require("./login/login.component");

var file_not_found_component_1 = require("./shared/file-not-found/file-not-found.component");

var auth_guard_1 = require("./lib/auth.guard");

var routes = [{
  path: '',
  loadChildren: function loadChildren() {
    return Promise.resolve().then(function () {
      return require('./main/main.module');
    }).then(function (m) {
      return m.MainModule;
    });
  },
  canActivate: [auth_guard_1.AuthGuard]
}, {
  path: 'login',
  // loadChildren: () =>
  //   import('./login/login.module').then((m) => m.LoginModule),
  component: login_component_1.LoginComponent
}, {
  path: '**',
  component: file_not_found_component_1.FileNotFoundComponent
}];

var AppRoutingModule =
/** @class */
function () {
  function AppRoutingModule() {}

  AppRoutingModule = __decorate([core_1.NgModule({
    imports: [router_1.RouterModule.forRoot(routes, {
      preloadingStrategy: router_1.PreloadAllModules
    })],
    exports: [router_1.RouterModule]
  })], AppRoutingModule);
  return AppRoutingModule;
}();

exports.AppRoutingModule = AppRoutingModule;