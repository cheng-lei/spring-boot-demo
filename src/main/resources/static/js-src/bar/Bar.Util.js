/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Module.Util.js
 * @path:   js-src/module/
 * @desc:   Module静态公共方法集合
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
        Bar.Util = Arm.create('Util', {
            name: 'Bar.Util'
            // FORMATTER: {},
            // VALIDATOR: {},
        });
    }
);