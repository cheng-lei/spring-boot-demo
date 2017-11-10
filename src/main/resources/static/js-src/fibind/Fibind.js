/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Fibind.js
 * @path:   js-src/fibind/
 * @desc:   Fibind模块中对象与版本声明
 * @author: yangpengfei@qiyi.com
 * @date:   2015-03-12
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        window.Fibind = Arm.create('Module', {
            name: 'Fibind',
            version: '1.0'
        });
        return Fibind;
    }
);