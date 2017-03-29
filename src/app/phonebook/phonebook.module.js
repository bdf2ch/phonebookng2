"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var divisions_service_1 = require('./divisions.service');
var phone_book_service_1 = require("./phone-book.service");
var session_service_1 = require("./session.service");
var cookie_service_1 = require("./cookie.service");
var phonebook_component_1 = require('./phonebook/phonebook.component');
var PhonebookModule = (function () {
    function PhonebookModule() {
    }
    PhonebookModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
            ],
            declarations: [phonebook_component_1.PhonebookComponent],
            providers: [
                divisions_service_1.DivisionsService,
                phone_book_service_1.PhoneBookService,
                session_service_1.SessionService,
                cookie_service_1.CookieService
            ]
        })
    ], PhonebookModule);
    return PhonebookModule;
}());
exports.PhonebookModule = PhonebookModule;
