/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Selector.Config.js
 * @path:   js-src/Selector/
 * @desc:   Selector公共配置集合
 * @author: wangyifeng@qiyi.com
 * @date:   2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'selector/Selector'
    ],
    function(Selector) {
        Selector.Config = Arm.create('Config', {
            name: 'Selector.Config'
        });
    }
);