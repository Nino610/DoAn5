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
exports.AppModule = void 0;

var shared_module_1 = require("src/app/shared/shared.module");

var platform_browser_1 = require("@angular/platform-browser");

var core_1 = require("@angular/core");

var common_1 = require("@angular/common");

var forms_1 = require("@angular/forms");

var app_routing_module_1 = require("./app-routing.module");

var app_component_1 = require("./app.component");

var login_component_1 = require("./login/login.component");

var animations_1 = require("@angular/platform-browser/animations");

var http_1 = require("@angular/common/http");

var http_2 = require("@angular/common/http");

var error_interceptor_1 = require("./lib/error.interceptor");

var jwt_interceptor_1 = require("./lib/jwt.interceptor");

var ngx_toastr_1 = require("ngx-toastr");

var AppModule =
/** @class */
function () {
  function AppModule() {}

  AppModule = __decorate([core_1.NgModule({
    declarations: [app_component_1.AppComponent, login_component_1.LoginComponent],
    imports: [shared_module_1.SharedModule, common_1.CommonModule, platform_browser_1.BrowserModule, http_1.HttpClientModule, animations_1.BrowserAnimationsModule, forms_1.ReactiveFormsModule, app_routing_module_1.AppRoutingModule, ngx_toastr_1.ToastrModule.forRoot()],
    providers: [{
      provide: http_2.HTTP_INTERCEPTORS,
      useClass: jwt_interceptor_1.JwtInterceptor,
      multi: true
    }, {
      provide: http_2.HTTP_INTERCEPTORS,
      useClass: error_interceptor_1.ErrorInterceptor,
      multi: true
    }],
    bootstrap: [app_component_1.AppComponent, login_component_1.LoginComponent]
  })], AppModule);
  return AppModule;
}();

exports.AppModule = AppModule;