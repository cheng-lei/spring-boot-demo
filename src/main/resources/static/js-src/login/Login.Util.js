/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Login.Util.js
 * @author: lichunping@qiyi.com
 */

qui(function() {
    Login.Util = Arm.create('Util', {
        name: 'Login.Util',
        addValidateMethod: function(jQuery) {
            jQuery = jQuery || window.jQuery;
            jQuery.validator.addMethod("hasLowerCase", function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                return /[A-Z]+/.test(value);
            }, "需含有大写字母");

            jQuery.validator.addMethod("hasUpperCase", function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                return /[a-z]+/.test(value);
            }, "需含有小写字母");

            jQuery.validator.addMethod("hasNumber", function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                return /\d+/.test(value);
            }, "需含有数字");

            jQuery.validator.addMethod("minPSWLength", function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                return 6 <= value.length;
            }, "至少6个字符");

            jQuery.validator.addMethod("validateID", function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                return /^[a-zA-Z_\d]+$/.test(value);
            }, "字母、数字、下划线组成的ID");

            jQuery.validator.addMethod("equalTarget", function(value, element, param) {
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }

                if (param.$target && param.$target.length) {
                    return value == param.$target.val();
                }
                return true;
            }, "与目标不符");

        }
    });
});