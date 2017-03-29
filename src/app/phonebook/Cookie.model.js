"use strict";
;
var Cookie = (function () {
    function Cookie(config) {
        this.name = '';
        this.value = '';
        if (config) {
            this.name = config.name;
            this.value = config.value;
        }
    }
    ;
    return Cookie;
}());
exports.Cookie = Cookie;
;
