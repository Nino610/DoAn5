"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(productService, messageService, confirmationService, authenticationService) {
        this.productService = productService;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.authenticationService = authenticationService;
        this.foods = [
            { value: 'HK1-2018-2019', viewValue: 'Học kỳ 1 - Năm Học 2018-2019' },
            { value: 'HK2-2018-2019', viewValue: 'Học kỳ 2- Năm Học 2018-2019' },
            { value: 'HK1-2019-2020', viewValue: 'Học kỳ 1 - Năm Học 2019-2020' },
            { value: 'HK2-2019-2020', viewValue: 'Học kỳ 2 - Năm Học 2019-2020' },
            { value: 'HK1-2020-2021', viewValue: 'Học kỳ 1 - Năm Học 2020-2021' },
            { value: 'HK2-2020-2021', viewValue: 'Học kỳ 2 - Năm Học 2020-2021' },
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // this.productService.getProducts().then((data) => (this.products = data));
        // console.log(this.authenticationService.userValue);
    };
    DashboardComponent.prototype.openNew = function () {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    };
    DashboardComponent.prototype.deleteSelectedProducts = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.products = _this.products.filter(function (val) { return !_this.selectedProducts.includes(val); });
                _this.selectedProducts = null;
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    };
    DashboardComponent.prototype.editProduct = function (product) {
        this.product = __assign({}, product);
        this.productDialog = true;
    };
    DashboardComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.products = _this.products.filter(function (val) { return val.id !== product.id; });
                _this.product = {};
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    };
    DashboardComponent.prototype.hideDialog = function () {
        this.productDialog = false;
        this.submitted = false;
    };
    DashboardComponent.prototype.saveProduct = function () {
        this.submitted = true;
        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            }
            else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
            }
            this.products = __spreadArrays(this.products);
            this.productDialog = false;
            this.product = {};
        }
    };
    DashboardComponent.prototype.findIndexById = function (id) {
        var index = -1;
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    DashboardComponent.prototype.createId = function () {
        var id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: '../dashboard/dashboard.component.html',
            styles: [
                "\n      :host ::ng-deep .p-dialog .product-image {\n        width: 150px;\n        margin: 0 auto 2rem auto;\n        display: block;\n      }\n    ",
            ],
            styleUrls: ['../dashboard/dashboard.component.css']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
