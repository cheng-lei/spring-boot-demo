/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.js
 * @path:   js-src/table/
 * @desc:   Table模块中对象与版本声明
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [],
    function() {
        // 创建一个模块，可以参见shell/create-module.sh自动创建
        window.Table = Arm.create('Module', {
            name: 'Table',
            version: '1.0'
        });
        return Table;
    }
);