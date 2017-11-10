/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.Class.js
 * @path:   js-src/hello/
 * @desc:   Collector模块下基础业处理类
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
        Collector.Class = Arm.create('Class', {
            name: 'Collector.Class',
            properties: {
                userModel: null
            },
            options: {},

            _findValue: function(clazz, attr) {
                return function($form, robj) {
                    var inputArray = [],
                        $nodes = $form.find('span ' + clazz);
                    $.each($nodes, function() {
                        inputArray.push($(this).attr(attr).trim());
                    });
                    return inputArray.length ? inputArray.join(', ') : '[empty!]';
                };
            },

            _getValue: function() {
                return function($form, robj) {
                    return this.value ? this.value : '[empty!]';
                };
            },

            getUserParam: function($form) {
                var findValue = this._findValue;
                var getValue = this._getValue;

                var options = {
                    userName: getValue(),
                    mobilePhone: getValue(),
                    email: getValue(),
                    mostLikePopularStar: findValue('.ui-suggest-value', 'data-tag-id'),

                    // 得到结果后，还可以通过`process`函数处理结果
                    __process__: function(obj, $form, robj) {
                        //  this.uuid = genUUID();
                        var dt = new Date();
                        this.submitTime = 'Time: ' + dt.toUTCString();
                    }
                };
                // 通过`getParamObj`方法获取表单参数
                return $form.formit('getParamObj', options);
            },

            setUserModel: function(userModel) {
                if (this.userModel instanceof Arm.Model) {
                    this.userModel.update(userModel);
                } else {
                    this.userModel = new Arm.Model(userModel);
                }
            },

            getUserModel: function() {
                return this.userModel;
            },

            saveUserInfo: function(callback) {
                var userModel = this.getUserModel().toPlain();
                var self = this;
                this.getAction().getDao().saveUserInfo(userModel, {
                    success: function(response) {
                        callback.call(self, response, 'success');
                    },
                    fail: function(response) {
                        callback.call(self, response, 'fail');
                    },
                    error: function(error) {
                        callback.call(self, error, 'error');
                    }
                });
            }
        });
    }
);