System.register(['angular2/core', 'angular2-jwt/angular2-jwt', 'angular2/router', '/app/shared/services/page.service', '/app/shared/components/add-page/add-page.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, angular2_jwt_1, router_1, page_service_1, add_page_component_1;
    var PagesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (page_service_1_1) {
                page_service_1 = page_service_1_1;
            },
            function (add_page_component_1_1) {
                add_page_component_1 = add_page_component_1_1;
            }],
        execute: function() {
            PagesComponent = (function () {
                function PagesComponent(_pageService) {
                    this._pageService = _pageService;
                }
                /**
                 * Init pages
                 *
                 */
                PagesComponent.prototype.ngOnInit = function () {
                    this.showAddPage = false;
                    this.list();
                };
                /**
                 * Updates the list
                 */
                PagesComponent.prototype.list = function () {
                    var _this = this;
                    this._pageService.list()
                        .subscribe(function (data) { _this.pages = data; }, function (error) { return _this.errorMessage = error; });
                };
                /**
                 * Resets an modal booleans
                 */
                PagesComponent.prototype.reset = function () {
                    this.showAddPage = false;
                };
                /**
                 * Sets the list item to active
                 *
                 * @param {Page} page
                 */
                PagesComponent.prototype.setActive = function (page) {
                    this.selectedPage = page;
                };
                /**
                 * Shows the add dialog
                 */
                PagesComponent.prototype.showAdd = function () {
                    this.showAddPage = true;
                };
                /**
                 * Shows the remove dialog
                 *
                 * @param {Page} page
                 */
                PagesComponent.prototype.showRemove = function (page) { alert('[respond] showRemove()'); console.log(page); };
                /**
                 * Shows the settings dialog
                 *
                 * @param {Page} page
                 */
                PagesComponent.prototype.showSettings = function (page) { alert('[respond] showSettings()'); console.log(page); };
                /**
                 * Shows the settings dialog
                 *
                 * @param {Page} page
                 */
                PagesComponent.prototype.edit = function (page) {
                    window.location = '/edit?q=matt/' + page.Url;
                };
                PagesComponent = __decorate([
                    core_1.Component({
                        selector: 'respond-pages',
                        templateUrl: './app/pages/pages.component.html',
                        providers: [page_service_1.PageService],
                        directives: [add_page_component_1.AddPageComponent]
                    }),
                    router_1.CanActivate(function () { return angular2_jwt_1.tokenNotExpired(); }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof page_service_1.PageService !== 'undefined' && page_service_1.PageService) === 'function' && _a) || Object])
                ], PagesComponent);
                return PagesComponent;
                var _a;
            }());
            exports_1("PagesComponent", PagesComponent);
        }
    }
});
//# sourceMappingURL=pages.component.js.map