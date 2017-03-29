"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model_class_1 = require("./Model.class");
var PhoneConfig = (function () {
    function PhoneConfig() {
    }
    return PhoneConfig;
}());
exports.PhoneConfig = PhoneConfig;
;
var Phone = (function (_super) {
    __extends(Phone, _super);
    function Phone(config) {
        _super.call(this);
        this.id = 0;
        this.contactId = 0;
        this.atsId = 0;
        this.number = '';
        if (config) {
            this.id = config.id;
            this.contactId = config.contact_id;
            this.atsId = config.ats_id;
            this.number = config.number;
        }
    }
    ;
    return Phone;
}(Model_class_1.Model));
exports.Phone = Phone;
;
