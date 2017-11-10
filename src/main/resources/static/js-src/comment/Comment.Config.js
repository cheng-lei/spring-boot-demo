/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Comment.Config.js
 * @path:   js-src/comment/
 * @desc:   Comment公共配置集合
 * @author: zhumin@qiyi.com,lichunping@qiyi.com
 * @date:   2015-03-11
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'comment/Comment'
    ],
    function(Comment) {
        Comment.Config = Arm.create('Config', {
            name: 'Comment.Config'
        });
    }
);