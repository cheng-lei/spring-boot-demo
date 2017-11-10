/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Fibind.Action.js
 * @path:   js-src/fibind/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
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
        Fibind.Action = Arm.create('Action', {
            name: 'Fibind.Action'
        });
    }
);