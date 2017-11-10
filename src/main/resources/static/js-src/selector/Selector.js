/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Selector.js
 * @path:   js-src/selector/
 * @desc:   Selector模块中对象与版本声明
 * @author: wangyifeng@qiyi.com
 * @date:   2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        window.Selector = Arm.create('Module', {
            name: 'Selector',
            version: '1.0'
        });
        return Selector;
    }
);