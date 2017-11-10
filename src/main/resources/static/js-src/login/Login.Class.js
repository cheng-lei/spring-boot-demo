/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Login.Class.js
 * @author: lichunping@qiyi.com
 */

qui(function() {
    Login.Class = Arm.create('Class', {
        name: 'Login.Class',
        properties: {
            user: null,
            userList: null
        },
        options: {

        },
        init: function() {
            this.logger = Logger.get(this);
        },
        setUserList: function(userList) {
            if (this.userList instanceof Arm.ArrayList) {
                this.userList.update(userList);
            } else {
                this.userList = new Arm.ArrayList(userList);
            }
        },

        getUserList: function() {
            return this.userList;
        },

        setUser: function(user) {
            if (this.user instanceof Arm.Model) {
                this.user.update(user);
            } else {
                this.user = new Arm.Model(user);
            }
        },

        getUser: function() {
            return this.user;
        },

        login: function(param, callback) {
            this.getDao().login(param, callback);
        },
        register: function(callback) {
            var param = this.getUser().toPlain();
            this.getDao().register(param, callback);
        },
        getLoginParam: function($form) {
            return $form.formit('getParamObj', {
                // 数据的再处理
            });
        },
        getRegisterParam: function($form) {
            var self = this;
            return $form.formit('getParamObj', {
                'user.id': function ($form, originObj) {
                    self.logger.log('getRegisterParam', 'Arguments:', arguments, 'Element:', this);
                },
                // 干预数据，数据的再处理
                'user.sex': function ($form, originObj) {
                    var value = $(this).val() == '1' ? 'male' : 'famale';
                    return value;
                }
            });
        }
    });
});