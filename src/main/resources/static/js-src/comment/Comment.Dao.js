/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Comment.Dao.js
 * @path:   js-src/comment/
 * @desc:   负责Comment模块远程调用的静态对象
 * @author: zhumin@qiyi.com,lichunping@qiyi.com
 * @date:   2015-3-11
 */

define(
    [
        'comment/Comment'
    ],
    function(Comment) {
        Comment.Dao = Arm.create('Dao', {
            name: 'Comment.Dao',

            getComments: function(data, handle, url) {
                url = url || './data/userInfo.json';
                Logger.get(this).log('getComment', 'Arguments:', arguments);
                // 不使用this，则在class调用时可以直接调用，而无须闭包调用
                // Comment.Dao.ajax(url, 'GET', data, handle);
                // this.ajax 继承自Base.Dao
                // 静态方法集合里使用this，要注意this指针可能更改的问题
                this.ajax(url, 'GET', data, handle);
            },

            saveComment: function(data, handle, url) {
                url = url || './data/userInfo.json';
                // 正式环境应该是POST/PUT
                this.ajax(url, 'GET', data, handle);
                // this.ajax(url, 'POST', data, handle);
            }
        });
    }
);