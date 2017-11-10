/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   SelectorMultilingual.Config.js
 * @path:   js-src/SelectorMultilingual/
 * @desc:   SelectorMultilingual公共配置集合
 * @author: wangyifeng@qiyi.com
 * @date:   2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'selectorMultilingual/SelectorMultilingual'
    ],
    function(SelectorMultilingual) {
        SelectorMultilingual.Config = Arm.create('Config', {
            name: 'SelectorMultilingual.Config'
        });
    }
);