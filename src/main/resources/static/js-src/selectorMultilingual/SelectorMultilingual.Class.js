/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   SelectorMultilingual.Class.js
 * @path:   js-src/selectorMultilingual/
 * @desc:   SelectorMultilingual模块下基础业处理类
 * @author: wangyifeng@qiyi.com
 * @date: 2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'selectorMultilingual/SelectorMultilingual'
    ],
    function(SelectorMultilingual) {
        SelectorMultilingual.Class = Arm.create('Class', {
            name: 'SelectorMultilingual.Class',
            properties: {
                selectorModel: null
            },
            options: {
                defaultData: {
                    country: [1001, 1002],
                    place: [1011, 1016, 2011, 2018]
                },
            },

            init: function() {
                this.logger = Logger.get(this);
            },

            getDefaultData: function() {
                // 模拟的初始化数据
                var data = this.options.defaultData;
                return data;
            },

            setDefaultData: function(param) {
                //重新设置初始化数据
                this.options.defaultData = param;
            },


            setSelectorModel: function(selectorModel) {
                if (this.selectorModel instanceof Arm.Model) {
                    this.selectorModel.update(selectorModel);
                } else {
                    this.selectorModel = new Arm.Model(selectorModel);
                }
            },

            getSelectorModel: function() {
                return this.selectorModel;
            },

            saveSelectorModel: function(param, callback) {
                var self = this;
                var data = param || self.getSelectorModel().toPlain();
                this.logger.log('saveSelectorModel', 'Data:', data);
                this.action.getDao().saveSelectorInfo(data, {
                    success: function(response) {
                        callback.call(self, response, 'success');
                    },
                    fail: function(response) {
                        callback.call(self, response, 'fail');
                    }
                });
            }
        });
    }
);