/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Selector.View.js
 * @path:   js-src/selector/
 * @desc:   Selector模块下页面业对象类
 * @author: wangyifeng@qiyi.com
 * @date:   2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'selector/Selector'
    ],
    function(Selector) {
        Selector.View = Arm.create('View', {
            name: 'Selector.View',
            properties: {
                $form: null,
                $template: null
            },

            options: {
                FirstListSelector: '#1',
                SecondListSelector: '#2',
                templateSelector: '#SelectorTemplate',
                checkboxSelector: 'input[type="checkbox"]',
                parentSelector: "#ParentCategory .parent-name",
                whetherValidate: true
            },

            init: function() {
                this.$form = this.find('.selector-dialog');
                this.$template = $(this.options.templateSelector);
                this.class = this.action.getClass({});
                this.util = this.action.getUtil();
                this.logger = Logger.get(this);
            },

            // view 负责事件bind,trigger以及DOM渲染增删等操作
            events: {
                // 多个事件方法逗号或空格间隔
                'click #ParentCategory': 'changeDisplay',
                'click #Reset': 'reset,changeDisplay',
                'click #Restore': 'restore,changeDisplay',
                'click .checkbox-all': 'selectAll',
                'click .place-list .checkbox-inline': 'checkIsAll',
                'click #Submit': 'isValidate,save'
            },

            //根据所选父级选项，显示和隐藏子级选项
            changeDisplay: function() {
                var self = this;
                var $arr = this.find(this.options.parentSelector);
                $arr.each(function(index, el) {
                    var id = $(el).val();
                    var $div = self.find("dd[parent-id = " + id + "]");
                    var $checkbox = $div.find('input[type="checkbox"]');
                    if ($(el).is(':checked')) {
                        $div.show();
                    } else {
                        $div.hide();
                        $checkbox.prop('checked', false);
                    }
                });
            },

            //设置全选
            selectAll: function(evt) {
                var self = this;
                var $el = $(evt.target).parents('.child-category').find('.select-all');
                var id = $el.val();
                var $div = self.find("div[select-id = " + id + "]");
                var $checkbox = $div.find('input[type="checkbox"]');
                if ($el.is(':checked')) {
                    $checkbox.prop('checked', true);
                } else {
                    $checkbox.prop('checked', false);
                }
            },

            //判断提交时是否没有选择相应子选项
            isValidate: function() {
                var self = this;
                var $arr = self.find(this.options.parentSelector);
                $arr.each(function(index, el) {
                    var id = $(el).val();
                    var $div = self.find("dd[parent-id = " + id + "]");
                    var size = $div.find('input[type="checkbox"]:checked').size();
                    if ($(el).is(':checked') && size === 0) {
                        self.options.whetherValidate = false;
                        //提示信息运用qui Tip相应插件
                        qui.msg({
                            content: '请选择相应子选项后再提交',
                            theme: 'error'
                        });
                    } else {
                        self.options.whetherValidate = true;
                    }
                });
            },

            //当子选项未全选时，取消全选。反之，则勾选全选
            checkIsAll: function(evt) {
                var self = this;
                var $el = $(evt.target).parents('.child-category').find('.select-all');
                var id = $el.val();
                var $div = self.find("div[select-id = " + id + "]");
                var size = $div.find('input[type="checkbox"]').not(':checked').size();
                if ($el.is(':checked') && size > 0) {
                    $el.prop('checked', false);
                } else if (!($el.is(':checked')) && size === 0) {
                    $el.prop('checked', true);
                }
            },

            //设置默认参数或重置参数
            restore: function() {
                var self = this;
                var data = this.class.getDefaultData();
                Formit.setFormValues(self.$form, data);

                self.print(data);
            },

            //清空所有选项
            reset: function() {
                var $cur = this.find('pre.cur-param');
                var $allCheckbox = this.find(this.options.checkboxSelector).filter(':checked');
                $allCheckbox.prop('checked', false);
                $cur.text('Click green or blue button to get params.');
            },

            //提交所选数据
            save: function() {
                var self = this;
                if (this.options.whetherValidate === true) {
                    var data = Formit.getParamObj(self.$form);
                    //提交后默认数据也将改为提交的数据
                    this.class.setDefaultData(data);
                    self.logger.log('save', 'Data before save:', data);
                    self.class.setSelectorModel(data);
                    var param = self.class.getSelectorModel().toPlainJSON();
                    self.class.saveSelectorModel(param, function(data, status) {
                        self.logger.log('save', 'Save result:', data);
                        var content = status == 'success' ? '操作成功。' : '操作失败';
                        $.tip({
                            theme: 'success',
                            content: content + data.msg
                        });
                    });
                    self.print();
                }
            },

            print: function(data) {
                data = data || this.class.getSelectorModel().toPlain();
                var dataStr = window.FormatJSON ? window.FormatJSON(JSON.stringify(data)) : JSON.stringify(data);
                var $cur = this.find('pre.cur-param');
                $cur.text(dataStr);
                this.logger.log('print', 'Selector Model:', this.class.getSelectorModel());
            },

            // 用于模板渲染
            render: function() {
                var firstData = this.options.firstData;
                var secondData = this.options.secondData;
                var firstList = this.find(this.options.FirstListSelector);
                var secondList = this.find(this.options.SecondListSelector);
                this.$template.tmpl(firstData).appendTo(firstList);
                this.$template.tmpl(secondData).appendTo(secondList);
            },

            // 用于触发事件
            triggerRun: function() {

            },

            run: function() {
                this.render();
                this.triggerRun();
            }
        });
    }
);