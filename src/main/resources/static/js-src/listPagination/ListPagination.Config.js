/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   ListPagination.Config.js
 * @path:   js-src/listPagination/
 * @desc:   公共配置集合
 * @author: jianghuifei@qiyi.com
 * @date: 2015-01-27
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'listPagination/ListPagination'
    ],
    function(ListPagination) {
        ListPagination.Config = Arm.create('Config', {
            name: 'ListPagination.Config'
        });
    }
);