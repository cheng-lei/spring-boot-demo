/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Module.js
 * @path:   js-src/module/
 * @desc:   Module模块声明
 * @author: lichunping@qiyi.com
 * @date:   2014-7-16
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        window.Bar = Arm.create('Module', {
            name: 'Bar',
            version: '1.0'
        });
        return Bar;
    }
);
