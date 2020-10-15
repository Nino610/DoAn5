"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainModule = exports.mainRoutes = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var sidebar_component_1 = require("../shared/sidebar/sidebar.component");
var footer_component_1 = require("../shared/footer/footer.component");
var navbar_component_1 = require("../shared/navbar/navbar.component");
var main_component_1 = require("./main.component");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var auth_guard_1 = require("../lib/auth.guard");
var role_1 = require("../models/role");
var shared_module_1 = require("../shared/shared.module");
var unauthorized_component_1 = require("../shared/unauthorized/unauthorized.component");
var file_not_found_component_1 = require("../shared/file-not-found/file-not-found.component");
var productservice_1 = require("../productservice");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var table_1 = require("primeng/table");
var toast_1 = require("primeng/toast");
var calendar_1 = require("primeng/calendar");
var slider_1 = require("primeng/slider");
var multiselect_1 = require("primeng/multiselect");
var contextmenu_1 = require("primeng/contextmenu");
var dialog_1 = require("primeng/dialog");
var button_1 = require("primeng/button");
var dropdown_1 = require("primeng/dropdown");
var progressbar_1 = require("primeng/progressbar");
var inputtext_1 = require("primeng/inputtext");
var fileupload_1 = require("primeng/fileupload");
var toolbar_1 = require("primeng/toolbar");
var rating_1 = require("primeng/rating");
var radiobutton_1 = require("primeng/radiobutton");
var inputnumber_1 = require("primeng/inputnumber");
var confirmdialog_1 = require("primeng/confirmdialog");
var api_1 = require("primeng/api");
var api_2 = require("primeng/api");
var inputtextarea_1 = require("primeng/inputtextarea");
var badge_1 = require("@angular/material/badge");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var button_2 = require("@angular/material/button");
var button_toggle_1 = require("@angular/material/button-toggle");
var card_1 = require("@angular/material/card");
var checkbox_1 = require("@angular/material/checkbox");
var chips_1 = require("@angular/material/chips");
var stepper_1 = require("@angular/material/stepper");
var datepicker_1 = require("@angular/material/datepicker");
var dialog_2 = require("@angular/material/dialog");
var divider_1 = require("@angular/material/divider");
var expansion_1 = require("@angular/material/expansion");
var grid_list_1 = require("@angular/material/grid-list");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var list_1 = require("@angular/material/list");
var menu_1 = require("@angular/material/menu");
var core_2 = require("@angular/material/core");
var paginator_1 = require("@angular/material/paginator");
var progress_bar_1 = require("@angular/material/progress-bar");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var sidenav_1 = require("@angular/material/sidenav");
var slider_2 = require("@angular/material/slider");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var list_subject_component_1 = require("./list-subject/list-subject.component");
var calendar_component_1 = require("./calendar/calendar.component");
var ng2_search_filter_1 = require("ng2-search-filter");
exports.mainRoutes = [
    {
        path: '',
        component: main_component_1.MainComponent,
        children: [
            {
                path: '',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: 'listsubject',
                component: list_subject_component_1.ListSubjectComponent
            },
            {
                path: 'calendar',
                component: calendar_component_1.CalendarComponent
            },
            {
                path: 'not-found',
                component: file_not_found_component_1.FileNotFoundComponent
            },
            {
                path: 'unauthorized',
                component: unauthorized_component_1.UnauthorizedComponent
            },
            {
                path: 'user',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./user/user.module'); }).then(function (m) { return m.UserModule; });
                },
                canActivate: [auth_guard_1.RoleGuard],
                data: { roles: [role_1.Role.Admin] }
            },
            {
                path: 'product',
                loadChildren: function () {
                    return Promise.resolve().then(function () { return require('./product/product.module'); }).then(function (m) { return m.ProductModule; });
                },
                canActivate: [auth_guard_1.RoleGuard],
                data: { roles: [role_1.Role.Admin, role_1.Role.User] }
            },
        ]
    },
];
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            declarations: [
                sidebar_component_1.SidebarComponent,
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                main_component_1.MainComponent,
                dashboard_component_1.DashboardComponent,
                list_subject_component_1.ListSubjectComponent,
                calendar_component_1.CalendarComponent
            ],
            imports: [
                shared_module_1.SharedModule,
                ng2_search_filter_1.Ng2SearchPipeModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                table_1.TableModule,
                calendar_1.CalendarModule,
                slider_1.SliderModule,
                dialog_1.DialogModule,
                multiselect_1.MultiSelectModule,
                contextmenu_1.ContextMenuModule,
                bottom_sheet_1.MatBottomSheetModule,
                dropdown_1.DropdownModule,
                button_1.ButtonModule,
                toast_1.ToastModule,
                inputtext_1.InputTextModule,
                badge_1.MatBadgeModule,
                progressbar_1.ProgressBarModule,
                fileupload_1.FileUploadModule,
                toolbar_1.ToolbarModule,
                rating_1.RatingModule,
                forms_1.FormsModule,
                radiobutton_1.RadioButtonModule,
                inputnumber_1.InputNumberModule,
                confirmdialog_1.ConfirmDialogModule,
                inputtextarea_1.InputTextareaModule,
                button_2.MatButtonModule,
                button_toggle_1.MatButtonToggleModule,
                card_1.MatCardModule,
                checkbox_1.MatCheckboxModule,
                chips_1.MatChipsModule,
                stepper_1.MatStepperModule,
                datepicker_1.MatDatepickerModule,
                dialog_2.MatDialogModule,
                divider_1.MatDividerModule,
                expansion_1.MatExpansionModule,
                grid_list_1.MatGridListModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                list_1.MatListModule,
                menu_1.MatMenuModule,
                core_2.MatNativeDateModule,
                paginator_1.MatPaginatorModule,
                progress_bar_1.MatProgressBarModule,
                progress_spinner_1.MatProgressSpinnerModule,
                radio_1.MatRadioModule,
                core_2.MatRippleModule,
                select_1.MatSelectModule,
                sidenav_1.MatSidenavModule,
                slider_2.MatSliderModule,
                slide_toggle_1.MatSlideToggleModule,
                router_1.RouterModule.forChild(exports.mainRoutes)
            ],
            //ToastModule.forRoot(),
            bootstrap: [main_component_1.MainComponent],
            providers: [productservice_1.ProductService, api_2.MessageService, api_1.ConfirmationService]
        })
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
