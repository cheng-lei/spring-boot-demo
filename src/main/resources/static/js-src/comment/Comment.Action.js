/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Comment.Action.js
 * @path:   js-src/comment/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: zhumin@qiyi.com,lichunping@qiyi.com
 * @date:   2015-3-11
 */

define(
    [
        'comment/Comment'
    ],
    function(Comment) {
        Comment.Action = Arm.create('Action', {
            name: 'Comment.Action'
        });
    }
);