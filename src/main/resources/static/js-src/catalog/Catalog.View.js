/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Catalog.View.js
 * @path:   js-src/catalog/
 * @desc:   Catalog模块下页面业对象类
 * @author: yangpengfei@qiyi.com
 * @date:   2014-11-28
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'catalog/Catalog'
    ],
    function(Catalog) {
        Catalog.View = Arm.create('View', {
            name: 'Catalog.View',
            properties: {
                $form: null
            },

            options: {},

            init: function() {
                this.$form = this.find('form.param');
                this.class = this.action.getClass({});
                this.util = this.action.getUtil();
                this.fiController = this.$form.formit('getController', {context: this});
                this.logger = Logger.get(this);
            },
            // view 负责事件bind,trigger以及DOM渲染增删等操作
            events: {
                // 多个事件方法逗号或空格间隔
                'click button#Submit': 'save,multipClick multipClick2',
                'mouseover button#Submit': 'mouseoverTest',
                'customEvent button#Submit': 'multipClick multipClick2',
                'click button#Restore': 'restore'
            },

            multipClick: function(evt, ele) {
                this.logger.log('multipClick', 'Arguments:', arguments);
            },

            multipClick2: function(evt, ele) {
                this.logger.log('multipClick2', 'Arguments:', arguments);
            },

            customEvent: function(evt, ele) {
                this.logger.log('customEvent', 'Arguments:', arguments);
            },

            mouseoverTest: function(evt, ele) {
                this.logger.log('mouseoverTest', 'Arguments:', arguments);
            },

            save: function(event) {
                var self = this;
                var data = self.class.getCatalogParam(self.$form);
                self.logger.log('save', 'Data before save:', data);
                self.class.setCatalogModel(data);
                var param = self.class.getCatalogModel().toPlainJSON();
                self.class.saveCatalogModel(param, function(data, status) {
                    self.logger.log('save', 'Save result:', data);
                    var content = status == 'success' ? '操作成功。' : '操作失败';
                    $.tip({
                        theme: 'success',
                        content: content + data.msg
                    });
                });

                self.print();
            },

            restore: function(event) {
                var data = this.action.getClass().getStoreData();
                // 通过`setFormValues`方法设置表单值
                this.$form.formit('setFormValues', data);
            },

            print: function(data) {
                data = data || this.class.getCatalogModel().toPlain();
                var dataStr = window.FormatJSON ? window.FormatJSON(JSON.stringify(data)) : JSON.stringify(data);
                var $cur = this.find('pre.cur-param');
                $cur.text(dataStr);
                this.logger.log('print', 'Catalog Model:', this.class.getCatalogModel());
            },

            changeNameWhenSelect: function(evt, elem) {
                Catalog.Util.changeNameWhenSelect.call(elem, evt);
            },

            triggerRun: function() {
                this.trigger('click', 'button#Restore');
                // 同时trigger多个事件，逗号或空格间隔
                this.trigger('mouseover,customEvent', '#Submit', ['arg1', 'arg2']);
            },

            run: function() {
                // formit events
                this.fiController.run();
                this.triggerRun();
            }
        });
    }
);