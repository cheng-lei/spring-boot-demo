/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Linkage.Util.js
 * @path:   js-src/linkage/
 * @desc:   Linkage静态公共方法
 * @author: liuminghua@qiyi.com
 * @date:   2015-08-06
 */

qui(function() {
    Linkage.Util = Arm.create('Util', {
        name: 'Linkage.Util',
        addValidateMethod: function(jQuery) {
            jQuery = jQuery || window.jQuery;
            jQuery.validator.addMethod('isTelNumber', function(value, element, param) {
                if(!this.depend(param, element)) {
                    return 'dependency-mismatch';
                }
                return (/^1[3|4|5|8][0-9]\d{8}$/).test(value);
            }, '请输入有效手机号码');
            jQuery.validator.addMethod('isPostcode', function(value, element, param) {
                if(!this.depend(param, element)) {
                    return 'dependency-mismatch';
                }
                return (/^[1-9][0-9]{5}$/).test(value);
            }, '请输入有效的邮编');
        }
    });
});