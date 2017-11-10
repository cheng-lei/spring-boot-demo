/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Fibind.View.js
 * @path:   js-src/fibind/
 * @desc:   Fibind模块下页面业对象类
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
        Fibind.View = Arm.create('View', {
            name: 'Fibind.View',
            properties: {
            },

            options: {},

            events: {
                'click #SubmitButton': 'submit'
            },

            init: function() {
                this.config = this.action.getConfig();
                this.clazz = this.action.getClass();
                this.$form = this.find('form.param');
                this.setFormitController();
                this.setValidatorMessages();
            },

            setValidatorMessages: function() {
                var msgs = this.config.validator.defaultMessages;
                jQuery.extend(jQuery.validator.messages, msgs);
            },

            setFormitController: function() {
                var self = this;

                // $(selector).formit('getController', [options])
                self.fiController = self.$form.formit('getController', {context: this});
                // 通过formit controller的run方法绑定声明的事件
                console.log(self.fiController);
                self.fiController.run();
            },

            getValidator: function() {
                var self = this;
                var validateConfig = self.fiController.getValidateConfig();
                if(!self.formValidator) {
                    self.formValidator = Validator.getValidator(self.$form, validateConfig);
                }
                return self.formValidator;
            },

            submit: function() {
                this.getValidator().form();
            },

            triggerRun: function() {
                // 显示描述的已输入字数
                this.find('[name=description]').trigger('change');

                // 触发校验
                // this.find('#SubmitButton').trigger('click');
            },

            run: function() {
                this.triggerRun();
            }
        }).inherits(Fibind.EventsView);
    }
);
