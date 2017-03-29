"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Cookie_model_1 = require("./Cookie.model");
var CookieService = (function () {
    /**
     * Конструктор сервиса
     * Считывает куки из документа и помещает их в массив
     */
    function CookieService() {
        this.cookies = [];
        var cookies = document.cookie.split(';');
        var length = cookies.length;
        for (var i = 0; i < length; i++) {
            var item = cookies[i].trim();
            var cookie = new Cookie_model_1.Cookie({
                name: item.substr(0, item.indexOf('=')),
                value: item.substr(item.indexOf('=') + 1, item.length)
            });
            this.cookies.push(cookie);
        }
    }
    ;
    /**
     * Возвращает массив всех куки
     * @returns {Cookie[]}
     */
    CookieService.prototype.getAll = function () {
        return this.cookies;
    };
    ;
    /**
     * Возвращает куки по наименование
     * @param name {string} - наименование куки
     * @returns {Cookie|null}
     */
    CookieService.prototype.getByName = function (name) {
        var length = this.cookies.length;
        for (var i = 0; i < length; i++)
            if (this.cookies[i].name === name)
                return this.cookies[i];
        return null;
    };
    ;
    /**
     * Устанавливает новый куки
     * @param name {string} - наименование куки
     * @param value {string} - значение куки
     * @param expires? {Date|number} - срок действия
     * @param path? {string} - путь, внутри которого будет доступ к cookie
     * @param domain? {string} - домен, на котором доступно cookie
     * @returns {Cookie}
     */
    CookieService.prototype.set = function (name, value, expires, path, domain) {
        var cookieString = name + '=' + encodeURIComponent(value);
        if (expires && typeof expires === 'Date')
            cookieString += ';expires=' + expires.toUTCString();
        if (expires && typeof expires === 'number') {
            var date = new Date();
            date.setTime(date.getTime() + expires * 1000);
            cookieString += ';expires=' + date;
        }
        cookieString += path && path !== '' ? ';path=' + path : '';
        cookieString += domain && domain !== '' ? ';domain=' + domain : '';
        document.cookie = cookieString;
        var cookie = new Cookie_model_1.Cookie({ name: name, value: value });
        this.cookies.push(cookie);
        return cookie;
    };
    ;
    CookieService = __decorate([
        core_1.Injectable()
    ], CookieService);
    return CookieService;
}());
exports.CookieService = CookieService;
