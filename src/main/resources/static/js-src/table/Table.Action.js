/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.Action.js
 * @path:   js-src/table/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [
        'table/Table'
    ],
    function(Table) {
        Table.Action = Arm.create('Action', {
            name: 'Table.Action'
                // TODO: static method for exchange
        });
    }
);