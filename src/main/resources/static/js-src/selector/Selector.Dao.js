/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Selector.Dao.js
 * @path:   js-src/selector/
 * @desc:   负责与server端进行数据交互
 * @author: wangyifeng@qiyi.com
 * @date: 2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'selector/Selector'
    ],
    function(Selector) {
        Selector.Dao = Arm.create('Dao', {
            name: 'Selector.Dao',
            // Ajax请求，保存页面添加的提示信息
            saveSelectorInfo: function(data, handler, url) {
                url = url || './data/selectInfo.json';
                this.ajax(url, 'GET', data, handler);
            },
        });
    }
);