/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Fibind.EventsView.js
 * @path:   js-src/fibind/
 * @desc:   Fibind模块下页面业对象类
 * @author: yangpengfei@qiyi.com
 * @date:   2015-07-28
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'fibind/Fibind'
    ],
    function(Fibind) {
        Fibind.EventsView = Arm.create('View', {
            name: 'Fibind.EventsView',
            properties: {
            },

            options: {},

            events: {},

            init: function() {
            },

            // 将当前输入框的值复制到指定输入框
            copyValue: function(evt, elem) {
                Fibind.Util.copyValue.call(elem, evt);
            },

            // 提示当前选择的值
            alertChosenValue: function(evt, elem) {
                Fibind.Util.alertChosenValue.call(elem, evt);
            },

            // 显示已经输入的字数
            showTypedLetterLength: function(evt, elem) {
                Fibind.Util.showTypedLetterLength.call(elem, evt);
            },

            // 设置指定表单的指定属性
            setAttributeValue: function(evt, elem) {
                Fibind.Util.setAttributeValue.call(elem, evt);
            },

            // entry function of modules (complex component)

            // 日期选择器
            datepicker: function(elem) {
                $(elem).datepicker();
            },

            // 日期-时间选择器
            datetimepicker: function(elem) {
                $(elem).datetimepicker();
            }
        });
    }
);
