"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AuthorizationComponent = (function () {
    function AuthorizationComponent($element, $session) {
        this.$element = $element;
        this.$session = $session;
        this.onClose = new core_1.EventEmitter();
        this.opened = false;
        this.userNotFound = false;
        this.login = '';
        this.password = '';
    }
    AuthorizationComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
        this.opened = changes['isOpened']['currentValue'];
    };
    ;
    AuthorizationComponent.prototype.ngOnInit = function () { };
    ;
    AuthorizationComponent.prototype.ngAfterViewChecked = function () {
        if (this.opened) {
            var element = this.$element.nativeElement.childen[1];
            element.style.top = window.innerHeight / 2 - element.clientHeight / 2 + 'px';
            element.style.left = window.innerWidth / 2 - element.clientWidth / 2 + 'px';
        }
    };
    ;
    AuthorizationComponent.prototype.onWindowResize = function (event) {
        if (this.opened) {
            var element = this.$element.nativeElement.childen[1];
            element.style.left = event.target.innerWidth / 2 - element.clientWidth / 2 + 'px';
            element.style.top = event.target.innerHeight / 2 - element.clientHeight / 2 + 'px';
        }
    };
    ;
    AuthorizationComponent.prototype.open = function () {
        this.opened = true;
    };
    ;
    /**
     * Закрывает и очищает форму авторизации
     * @param form {any} - форма авторизации
     */
    AuthorizationComponent.prototype.close = function (form) {
        this.opened = false;
        this.userNotFound = false;
        form.reset();
        this.onClose.emit();
    };
    ;
    /**
     *
     * @param form
     */
    AuthorizationComponent.prototype.send = function (form) {
        var _this = this;
        this.$session.login(this.login, this.password).subscribe(function (result) {
            console.log(result);
            if (result)
                _this.close(form);
            else
                _this.userNotFound = true;
        });
    };
    ;
    __decorate([
        core_1.Input()
    ], AuthorizationComponent.prototype, "isOpened", void 0);
    __decorate([
        core_1.Output()
    ], AuthorizationComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], AuthorizationComponent.prototype, "onWindowResize", null);
    AuthorizationComponent = __decorate([
        core_1.Component({
            selector: 'authorization',
            templateUrl: './authorization.component.html',
            styleUrls: ['./authorization.component.css'],
            animations: [
                core_1.trigger("fog", [
                    core_1.state('true', core_1.style({
                        background: 'rgba(0, 0, 0, 0.5)'
                    })),
                    core_1.transition('void => *', core_1.animate("200ms linear")),
                    core_1.transition('* => void', core_1.animate("200ms linear")),
                ]),
                core_1.trigger("popup", [
                    core_1.state('true', core_1.style({
                        transform: 'scale(1.0)'
                    })),
                    core_1.state('false', core_1.style({
                        transform: 'scale(0.1)'
                    })),
                    core_1.transition('void => true', core_1.animate(100)),
                    core_1.transition('* => void', core_1.animate(100)),
                ])
            ]
        })
    ], AuthorizationComponent);
    return AuthorizationComponent;
}());
exports.AuthorizationComponent = AuthorizationComponent;
