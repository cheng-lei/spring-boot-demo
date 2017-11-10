/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Catalog.Config.js
 * @path:   js-src/catalog/
 * @desc:   Catalog公共配置集合
 * @author: yangpengfei@qiyi.com
 * @date:   2014-11-28
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'catalog/Catalog'
    ],
    function(Catalog) {
        Catalog.Config = Arm.create('Config', {
            name: 'Catalog.Config'
        });
    }
);