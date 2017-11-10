/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Module.Action.js
 * @path:   js-src/module/
 * @desc:   Action静态对象，声明对象以及部分绑定事件、对外接口等
 * @author: lichunping@qiyi.com
 * @date:   2014-7-16
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'bar/Bar'
    ],
    function(Bar) {
        Bar.Action = Arm.create('Action', {
            name: 'Bar.Action'
        });
    }
);