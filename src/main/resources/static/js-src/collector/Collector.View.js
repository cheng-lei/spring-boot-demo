/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.View.js
 * @path:   js-src/hello/
 * @desc:   Collector模块下基础DOM操作类
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
        Collector.View = Arm.create('View', {
            name: 'Collector.View',
            properties: {
                userinfoItemLength: 1,
                action: null,
                class: null,
                userInfoItems: null,
                $form: null
            },

            options: {
                formSelector: '#CollectorForm',
                userinfoSelector: '.userinfo-block',
                suggestTagSelector: '.suggest-tag'
            },

            init: function(options) {
                this.action = this.getAction();
                this.class = this.action.getClass();
                this.userInfoItems = this.action.getConfig().userInfoItems || [];
                this.$form = this.find(this.options.formSelector);
                this.action.getUtil().addValidator();
                this.logger = Logger.get(this);
                this.bindEvent();
            },

            events: {
                'click #Submit': 'submit'
            },

            bindEvent: function() {
                var self = this;

                self.find(self.options.userinfoSelector).addndel({
                    rowClass: 'form-group',
                    addDecorator: function($newRow, $clickedRow) {
                        self.addUserInfoRow.call(self, $newRow, $clickedRow);
                    },
                    delDecorator: function($deletedRow) {
                        self.delUserInfoRow.call(self, $deletedRow);
                    }
                });

                self.find(self.options.suggestTagSelector).suggest({
                    source: 'data/test.json',
                    valueKey: 'uuid', // 指定data-id同步的属性值
                    labelKey: 'label', // 用来显示的标签值，最终处理(如高亮)后显示的文本存储在_displayKey指定的字段
                    template: function(item) {
                        return '<span>' + item[this._displayKey] + '</span><br/><span style="font-size:10px; color:grey; text-align:left;">' + item.desc + '</span>';
                    },
                    header: '明星列表',
                    footer: '结果底部'
                });

            },

            bindDatepicker: function(input) {
                // $(input).datetimepicker({
                $(input).datepicker({
                    yearRange: '2010:+0',
                    addSliderAccess: true,
                    sliderAccessArgs: {
                        touchonly: false
                    }
                });
            },

            getValidator: function() {
                var self = this;
                var config = self.action.getConfig();
                var options = $.extend(config.validatorDefault, config.validator);
                return Validator.getValidator(self.$form, options);
            },

            submit: function(evt) {
                var self = this;
                evt.preventDefault();
                var validator = self.getValidator();
                if (validator.form()) {
                    var data = self.class.getUserParam(self.$form);
                    this.class.setUserModel(data);
                    self._printResult(data);
                    self.saveUserInfo();
                }
            },

            saveUserInfo: function(callback) {
                var self = this;
                callback = callback || function(response, status) {
                    self.logger.log('saveUserInfo', 'Response:', response, 'Status:', status);
                    var messager = this.action.getConfig().messager;
                    var content = messager[status];
                    $.tip({
                        theme: status,
                        content: content + response.msg
                    });
                };

                this.class.saveUserInfo(callback);
            },

            getUserInfoRowLength: function() {
                var self = this;
                return self.find(self.options.userinfoSelector).find('.control-group').length;
            },

            addUserInfoRow: function($newRow, $clickedRow) {
                var self = this;
                var placeholder, text, name, value;
                var dateInputName = 'birthday';
                var $userBlock = self.find(self.options.userinfoSelector);
                var _setAttr = function($row, item) {
                    if ('object' != typeof item) {
                        return;
                    }
                    var input = $row.find('input[type=text]')[0];
                    input.name = item.name;
                    input.value = item.value || '';
                    input.placeholder = '请输入' + item.text;
                    $row.find('.control-label').text(item.text);
                    if (item.must) {
                        $row.find('.control-label').append($('<span class="form-must">*</span>'));
                    }
                    if (item.name == dateInputName) {
                        self.bindDatepicker(input);
                    }
                };
                var items = $userBlock.find('input[type=text]').map(function() {
                    return this.name;
                }).toArray();
                this.userinfoItemLength = items.length + 1;
                var addedItem = self.action.getUtil().findItemNotInList(items, self.action.getConfig().userInfoItems);

                _setAttr($newRow, addedItem);

                self.logger.log('addUserInfoRow', 'userinfoItemLength:', this.userinfoItemLength, 'userInfoItems.length:', this.userInfoItems.length);

                if (this.userinfoItemLength == self.action.getConfig().userInfoItems.length) {
                    $newRow.find('.btn').removeClass('add').addClass('del').text('删除');
                }
                return true;
            },

            _getLastNode: function($currentNode) {
                var $lastChild = $currentNode.parent().children(':last-child');
                return $lastChild[0] === $currentNode[0] ? $lastChild.prev() : $lastChild;
            },

            delUserInfoRow: function($deletedRow) {
                var $lastChild = this._getLastNode($deletedRow);
                $lastChild.find('.btn').removeClass('del').addClass('add').text('添加');
                return true;
            },

            _printResult: function(data) {
                var self = this;
                var result = formatJSON ? formatJSON(JSON.stringify(data)) : JSON.stringify(data);
                var $resultArea = $('.result-container pre.panel-body');
                $resultArea.text(result);
            },

            // 用于模板渲染
            render: function() {

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