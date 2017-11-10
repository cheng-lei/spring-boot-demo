/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Module.Config.js
 * @path:   js-src/module/
 * @desc:   公共配置集合
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
        Bar.Config = Arm.create('Config', {
            // SELECTOR: {},
            // TEXXT: {},
            // MESSAGE: {},
            // VALIDATOR: {},
            // TEMPLATE: {},
        });
    }
);