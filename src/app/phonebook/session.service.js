"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var User_model_1 = require("./User.model");
var Session_model_1 = require('./Session.model');
require('rxjs/add/operator/map');
require('rxjs/add/operator/take');
var SessionService = (function () {
    function SessionService($http) {
        this.$http = $http;
        this.apiUrl = '/assets/serverside/api.php';
        this.user = null;
        this.session = null;
    }
    ;
    /**
     * Возвращает текущего пользователя
     * @returns {User|null}
     */
    SessionService.prototype.getCurrentUser = function () {
        return this.user;
    };
    ;
    /**
     * Возвращает текущую сессию
     * @returns {Session|null}
     */
    SessionService.prototype.getCurrentSession = function () {
        return this.session;
    };
    ;
    /**
     * Выполняет авторизацию пользователя
     * @param login {string} - учетная запись пользователя
     * @param password {string} - пароль пользователя
     * @returns {Observable<T>}
     */
    SessionService.prototype.login = function (login, password) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var parameters = { 'action': 'login', data: { login: login, password: password } };
        return this.$http.post(this.apiUrl, parameters, options)
            .map(function (res) {
            var body = res.json();
            console.log('login', body);
            if (body !== false) {
                _this.user = new User_model_1.User(body.user);
                _this.session = new Session_model_1.Session(body.session);
                console.log('session user', _this.user);
                console.log('session', _this.session);
                return true;
            }
            else
                return false;
        })
            .take(1);
    };
    ;
    /**
     * Выполняет выход пользователя из системы
     * @returns {Observable<T>}
     */
    SessionService.prototype.logout = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var parameters = { action: 'logout' };
        return this.$http.post(this.apiUrl, parameters, options)
            .map(function (response) {
            var body = response.json();
            if (body === true)
                _this.user = null;
            return body;
        })
            .take(1);
    };
    ;
    SessionService = __decorate([
        core_1.Injectable()
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
