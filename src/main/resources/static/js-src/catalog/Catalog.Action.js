/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Catalog.Action.js
 * @path:   js-src/catalog/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
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
        Catalog.Action = Arm.create('Action', {
            name: 'Catalog.Action'
        });
    }
);