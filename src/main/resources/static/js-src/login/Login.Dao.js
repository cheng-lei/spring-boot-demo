/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Login.Dao.js
 * @author: lichunping@qiyi.com
 */
qui(function() {
    Login.Dao = Arm.create('Dao', {
        name: 'Login.Dao',
        login: function(data, callback) {
            var url = window.location.pathname;
            this.ajax(url, 'get', data, callback);
        },
        register: function(data, callback) {
            var url = window.location.pathname;
            this.ajax(url, 'get', data, callback);
        }
    });
});