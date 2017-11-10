/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.Util.js
 * @path:   js-src/hello/
 * @desc:   Collector静态公共方法集合
 * @author: zhangyao@qiyi.com
 * @date: 2015-01-20
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'collector/Collector'
    ],
    function(Collector) {
        Collector.Util = Arm.create('Util', {
            name: 'Collector.Util',

            genUUID: function() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },

            /**
             * 从list中找出不存在arr中的项目,返回第一个
             *
             * @function
             * @param {array} source 目标参数
             * @meta standard
             * @returns {boolean} 类型判断结果
             */
            findItemNotInList: function(arr, list, keyName) {
                keyName = keyName || 'name';
                if (!(arr instanceof Array)) {
                    arr = [arr];
                }
                for (var i = 0, l = list.length; i < l; i++) {
                    // or use $.inArray
                    if (arr.indexOf && arr.indexOf(list[i][keyName]) < 0) {
                        return list[i];
                    }
                }
            },

            addValidator: function() {
                $.validator.addMethod("mobilePhone", function(value, element) {
                    var length = value.length;
                    var mobile = /^1\d{10}$/;
                    return mobile.test(value);
                }, " ");
                $.validator.addMethod("suggestRequired", function(value, element) {
                    return $(element).next().hasClass('ui-suggest-value');
                }, " ");
            }

        });
    }
);