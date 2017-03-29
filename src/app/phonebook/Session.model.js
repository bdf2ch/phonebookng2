"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model_class_1 = require("./Model.class");
var SessionConfig = (function () {
    function SessionConfig() {
    }
    return SessionConfig;
}());
exports.SessionConfig = SessionConfig;
;
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(config) {
        _super.call(this);
        this.id = 0;
        this.userId = 0;
        this.token = '';
        this.start = new Date();
        this.end = new Date();
        if (config) {
            this.id = config.id;
            this.userId = config.user_id;
            this.token = config.token;
            this.start = new Date(config.start);
            this.end = new Date(config.end);
        }
    }
    ;
    return Session;
}(Model_class_1.Model));
exports.Session = Session;
;
