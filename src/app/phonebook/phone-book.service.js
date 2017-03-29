"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Contact_model_1 = require("./Contact.model");
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/take');
var apiUrl = '/assets/serverside/api.php';
var PhoneBookService = (function () {
    function PhoneBookService($http) {
        this.$http = $http;
        this.contacts = [];
        this.loading = false;
        this.searchMode = false;
        this.searchQuery = '';
    }
    ;
    PhoneBookService.prototype.fetchByDivisionId = function (id) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var parameters = { action: 'getContactsByDivisionId', data: { divisionId: id } };
        return this.$http.post(apiUrl, parameters, options)
            .map(function (res) {
            _this.clear();
            var body = res.json();
            var length = body.length;
            for (var i = 0; i < length; i++) {
                var contact = new Contact_model_1.Contact(body[i]);
                _this.contacts.push(contact);
            }
            return _this.contacts;
        })
            .take(1)
            .catch(this.handleError);
    };
    ;
    /**
     * Осуществляет поиск контактов на сервере в соответствии с условием поиска
     * @returns {Observable<Contact|null>}
     */
    PhoneBookService.prototype.search = function () {
        var _this = this;
        var headers = new http_1.Headers({ "Content-Type": "application/json" });
        var options = new http_1.RequestOptions({ headers: headers });
        var params = { action: "searchContacts", data: { search: this.searchQuery } };
        this.searchMode = true;
        this.loading = true;
        return this.$http.post(apiUrl, params, options)
            .map(function (res) {
            _this.loading = false;
            var body = res.json();
            if (body !== null) {
                var length_1 = body.length;
                _this.clear();
                for (var i = 0; i < length_1; i++) {
                    var contact = new Contact_model_1.Contact(body[i]);
                    _this.contacts.push(contact);
                    _this.loading = false;
                }
            }
            else
                return null;
        })
            .take(1)
            .catch(this.handleError);
    };
    ;
    /**
     * Получение массива всех загруженных контактов
     * @returns {Contact[]}
     */
    PhoneBookService.prototype.getAll = function () {
        return this.contacts;
    };
    ;
    /**
     * Очистка массива контактов
     */
    PhoneBookService.prototype.clear = function () {
        this.contacts = [];
    };
    ;
    /**
     * Возвращает состояние режима поиска
     * @returns {boolean}
     */
    PhoneBookService.prototype.isInSearchMode = function () {
        return this.searchMode;
    };
    ;
    PhoneBookService.prototype.isLoading = function () {
        return this.loading;
    };
    ;
    /**
     * Обработчик ошибок при обращении к серверу
     * @param error {Response|any}
     * @returns {any}
     */
    PhoneBookService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.loading = false;
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ;
    PhoneBookService = __decorate([
        core_1.Injectable()
    ], PhoneBookService);
    return PhoneBookService;
}());
exports.PhoneBookService = PhoneBookService;
