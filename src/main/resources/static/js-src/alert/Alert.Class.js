/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Alert.Class.js
 * @path:   js-src/alert/
 * @desc:   Alert模块下基础业务对象类
 * @author: zhangzhao@qiyi.com
 * @date:   2016-03-08
 */
define(
    [
        'alert/Alert'
    ],
    function(Alert) {
        Alert.Class = Arm.create('Class', {
            name: 'Alert.Class',
            properties: {
                data: [],//一级菜单数据
                alertModel: null
            },
            options: {
                
            },

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
      
            //保存从Json中取到的数据
            saveData: function(response) {
                this.data = response.data;
            },

            getData: function() {
                return this.data;
            },

            //读取Json中的数据
            getJsonData: function(data,callback) {
                var self = this;
                self.action.getDao().getData(data, {
                    success: function(back) {
                        if (back.data) {
                            self.saveData(back);
                            callback();
                        }
                    }
                });
            },

            setAlertModel: function(alertModel) {
                if (this.alertModel instanceof Arm.Model) {
                    this.alertModel.update(alertModel);
                } else {
                    this.alertModel = new Arm.Model(alertModel);
                }
            },

            getAlertModel: function() {
                return this.alertModel;
            },

            // class 处理数据获取以及数据整理相关的逻辑
            // view 通过class调用dao
            getAlertParam: function($form) {
                var findValue = this._findValue;
                var getValue = this._getValue;
                // 数据获取相关可以放到class中处理
                var options = {

                    // 获取参数
                    userName: getValue(),
                    mobilePhone: getValue(),
                    email: getValue(),
                    locationName: findValue('.ui-suggest-value', 'data-tag-id'),

                    extra: function($form, data) {
                        var dt = new Date();
                        return dt.toUTCString() + '(return_from_custom_function)';
                    }
                };

                // 通过`getParamObj`方法获取表单参数，调用方法
                // $form.formit('getParamObj', [options], [fiConfig])
                return $form.formit('getParamObj', options);
            },

            saveAlertModel: function(param, callback) {
                var self = this;
                //self.processAlertModel();
                var data = param || self.getAlertModel().toPlain();
                //this.logger.log('saveAlertModel', 'Data:', data);
                this.action.getDao().saveAlert(data, {
                    success: function(response) {
                        callback.call(self, response, 'success');
                    },
                    fail: function() {
                        callback.call(self, response, 'fail');
                    }
                });
            }
        });
    }
);