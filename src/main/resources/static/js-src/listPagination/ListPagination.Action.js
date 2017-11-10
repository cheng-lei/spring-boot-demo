/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   ListPagination.Action.js
 * @path:   js-src/listPagination/
 * @desc:   Action静态对象，声明对象以及部分绑定事件、对外接口等
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
        ListPagination.Action = Arm.create('Action', {
            name: 'ListPagination.Action'
        });
    }
);