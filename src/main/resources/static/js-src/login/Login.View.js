/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Login.View.js
 * @author: lichunping@qiyi.com
 */

qui(function() {
    Login.View = Arm.create('View', {
        name: 'Login.View',
        properties: {},
        options: {},
        init: function() {
            var self = this;
            self.$loginForm = self.find("form[name='loginForm']");
            self.$registerForm = self.find("form[name='registerForm']");
            self.logger = Logger.get(this);

            self.initValidator();
            self.bindEvent();
        },

        initValidator: function() {
            var self = this,
                config = self.getConfig();
            this.class = this.action.getClass();

            self.action.getUtil().addValidateMethod();

            var errorPlacement = function($error, $element) {
                var $control = $element.closest('.scaffold-input-container');
                $control.addClass('error');
                $control.append($error);
            };
            var validateOptions = {
                ignore: '.ignore',
                errorPlacement: errorPlacement
            };

            self.$loginForm.validate($.extend({}, validateOptions, {
                submitHandler: function(form) {
                    self.login();
                }
            }, config.LOGIN_VALIDATORS));

            self.$registerForm.validate($.extend({}, validateOptions, {
                submitHandler: function(form) {
                    self.register();
                }
            }, config.REGISTER_VALIDATORS));

        },

        bindEvent: function(argument) {
            this.find("[name='user.birthday']").datepicker();
        },

        remoteHandler: function(param) {
            return function(data) {
                if (200 == data.status) {
                    qui.tip({
                        contentType: 'html',
                        content: "<p>提交成功！表单数据：</p>" + "<p>" + JSON.stringify(param) + "</p>"
                    });
                } else {
                    qui.tip({
                        content: "请求失败！"
                    });
                }
            };
        },
        login: function() {
            var param = this.class.getLoginParam(this.$loginForm);
            this.getClass().login(param, this.remoteHandler(param));
        },
        register: function() {
            var param = this.class.getRegisterParam(this.$registerForm);
            this.class.setUser(param);
            this.logger.log('register', 'Param:', param, 'User:', this.class.getUser());
            this.getClass().register(this.remoteHandler(param));
        },
        run: function(argument) {

        }
    });
});