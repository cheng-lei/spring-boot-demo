/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 * 
 * @file:   Comment.js
 * @path:   js-src/simple/
 * @desc:   Comment模块中对象与版本声明
 * @author: zhumin@qiyi.com,lichunping@qiyi.com
 * @date:   2015-03-11
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        // 创建一个模块，可以参见shell/create-module.sh自动创建
        window.Comment = Arm.create('Module', {
            name: 'Comment',
            version: '1.0'
        });

        return Comment;
    }
);