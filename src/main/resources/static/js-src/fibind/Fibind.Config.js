/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Fibind.Config.js
 * @path:   js-src/fibind/
 * @desc:   Fibind公共配置集合
 * @author: yangpengfei@qiyi.com
 * @date:   2015-03-12
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'fibind/Fibind'
    ],
    function(Fibind) {
        Fibind.Config = Arm.create('Config', {
            name: 'Fibind.Config',
            validator: {
                defaultMessages: {
                    required: "该字段不能为空",
                    remote: "请修正该字段",
                    email: "请输入正确的Email",
                    url: "请输入合法的URL",
                    date: "请输入合法的日期",
                    dateISO: "请输入合法的日期（ISO）",
                    number: "请输入合法的数字",
                    digits: "只能输入整数",
                    creditcard: "请输入合法的信用卡号",
                    equalTo: "必须输入相同的值",
                    accept: "必须是合法的扩展名",
                    maxlength: jQuery.validator.format("最大长度为{0}"),
                    minlength: jQuery.validator.format("最小长度为{0}"),
                    rangelength: jQuery.validator.format("长度必须在{0}和{1}之间"),
                    range: jQuery.validator.format("大小必须在{0}和{1}之间"),
                    max: jQuery.validator.format("最大值为{0}"),
                    min: jQuery.validator.format("最小值为{0}")
                }
            }
        });
    }
);