"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model_class_1 = require("./Model.class");
var ContactConfig = (function () {
    function ContactConfig() {
    }
    return ContactConfig;
}());
exports.ContactConfig = ContactConfig;
;
var Contact = (function (_super) {
    __extends(Contact, _super);
    function Contact(config) {
        _super.call(this);
        this.id = 0;
        this.userId = 0;
        this.divisionId = 0;
        this.surname = "";
        this.name = "";
        this.fname = "";
        this.position = "";
        this.email = "";
        this.phones = [];
        this.mobile = '';
        this.photo = "";
        this.fio = "";
        this.search = "";
        if (config) {
            this.id = config.id;
            this.userId = config.user_id;
            this.divisionId = config.division_id;
            this.surname = config.surname;
            this.name = config.name;
            if (config.fname)
                this.fname = config.fname;
            if (config.position)
                this.position = config.position;
            if (config.email)
                this.email = config.email;
            if (config.mobile)
                this.mobile = config.mobile;
            if (config.photo)
                this.photo = config.photo;
            this.fio = this.surname + ' ' + this.name + ' ' + this.fname;
            this.search = this.name.toLowerCase() + ' ' + this.fname.toLowerCase() + ' ' + this.surname.toLowerCase() + ' ' + this.email.toLowerCase() + this.phones.join(' ').toLowerCase() + ' ' + this.mobile.toLowerCase();
        }
    }
    ;
    return Contact;
}(Model_class_1.Model));
exports.Contact = Contact;
;
