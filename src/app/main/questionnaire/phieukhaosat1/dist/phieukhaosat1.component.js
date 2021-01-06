"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Phieukhaosat1Component = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var operators_1 = require("rxjs/operators");
var api_1 = require("primeng/api");
var Phieukhaosat1Component = /** @class */ (function () {
    function Phieukhaosat1Component(phieuKhaoSatService, route, router, messageService) {
        this.phieuKhaoSatService = phieuKhaoSatService;
        this.route = route;
        this.router = router;
        this.messageService = messageService;
        this.obj = {};
        this.phieukhaosats = null;
        this.employeeId = '';
        this.planID = '';
        this.value = [];
        this.idques = [];
    }
    Phieukhaosat1Component.prototype.complete = function () {
        var _this = this;
        for (var _i = 0, _a = this.phieukhaosats; _i < _a.length; _i++) {
            var ans = _a[_i];
            this.value.push(ans.answervalue);
            this.idques.push(ans.questionId);
        }
        console.log(this.value);
        console.log(this.idques);
        var answer = {
            employeeId: this.employeeId,
            PlanID: this.id,
            value: JSON.stringify(this.value),
            questionId: JSON.stringify(this.idques)
        };
        console.log(answer);
        this.phieuKhaoSatService
            .postAnswer(answer)
            .pipe(operators_1.first())
            .subscribe(function (res) {
            if (res > 0) {
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Thông báo',
                    detail: 'Khảo sát thành công'
                });
                setTimeout(function () {
                    _this.router.navigateByUrl('/');
                }, 1000);
            }
        });
    };
    Phieukhaosat1Component.prototype.ngOnInit = function () {
        var _this = this;
        this.phieuKhaoSatService.getAllPhieuKhaoSatSv().subscribe(function (res) {
            _this.phieukhaosats = res;
            for (var _i = 0, _a = _this.phieukhaosats; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.value.push();
            }
        });
        this.id = this.route.snapshot.paramMap.get('id');
        this.phieuKhaoSatService.GetPlanByID(this.id).subscribe(function (res) {
            _this.obj = res;
        });
    };
    Phieukhaosat1Component = __decorate([
        core_1.Component({
            selector: 'app-phieukhaosat1',
            templateUrl: './phieukhaosat1.component.html',
            styles: [
                "\n      :host ::ng-deep button {\n        margin-right: 0.5em;\n      }\n    ",
            ],
            styleUrls: ['./phieukhaosat1.component.css'],
            providers: [common_1.DatePipe, api_1.MessageService]
        })
    ], Phieukhaosat1Component);
    return Phieukhaosat1Component;
}());
exports.Phieukhaosat1Component = Phieukhaosat1Component;
