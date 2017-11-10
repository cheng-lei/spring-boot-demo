/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Catalog.js
 * @path:   js-src/catalog/
 * @desc:   Catalog模块中对象与版本声明
 * @author: yangpengfei@qiyi.com
 * @date:   2014-11-28
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        window.Catalog = Arm.create('Module', {
            name: 'Catalog',
            version: '1.0'
        });
        return Catalog;
    }
);