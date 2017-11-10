/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.Dao.js
 * @path:   js-src/table/
 * @desc:   负责Table模块远程调用的静态对象
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [
        'table/Table'
    ],
    function(Table) {
        Table.Dao = Arm.create('Dao', {
            name: 'Table.Dao',
            savePeople: function(data, handle, url) {
                url = url || '../data/list.json';
                console.log(url);
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);