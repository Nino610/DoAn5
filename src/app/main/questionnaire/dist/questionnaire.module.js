"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.QuestionnaireModule = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var phieukhaosat1_component_1 = require("./phieukhaosat1/phieukhaosat1.component");
var shared_module_1 = require("src/app/shared/shared.module");
var radiobutton_1 = require("primeng/radiobutton");
var inputtextarea_1 = require("primeng/inputtextarea");
var button_1 = require("primeng/button");
var QuestionnaireModule = /** @class */ (function () {
    function QuestionnaireModule() {
    }
    QuestionnaireModule = __decorate([
        core_1.NgModule({
            declarations: [phieukhaosat1_component_1.Phieukhaosat1Component],
            imports: [
                shared_module_1.SharedModule,
                radiobutton_1.RadioButtonModule,
                forms_1.FormsModule,
                button_1.ButtonModule,
                inputtextarea_1.InputTextareaModule,
                router_1.RouterModule.forChild([
                    {
                        path: 'questionnaire-1/:id',
                        component: phieukhaosat1_component_1.Phieukhaosat1Component
                    },
                ]),
            ]
        })
    ], QuestionnaireModule);
    return QuestionnaireModule;
}());
exports.QuestionnaireModule = QuestionnaireModule;
