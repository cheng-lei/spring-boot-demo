/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.Dao.js
 * @path:   js-src/hello/
 * @desc:   负责与server端进行数据交互
 * @author: zhangyao@qiyi.com
 * @date: 2015-01-20
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'collector/Collector'
    ],
    function(Collector) {
        Collector.Dao = Arm.create('Dao', {
            name: 'Collector.Dao',
            // Ajax请求，保存页面添加的提示信息
            saveUserInfo: function(data, handler, url) {
                url = url || './data/saveInfo.json';
                this.ajax(url, 'GET', data, handler);
            },
        });
    }
);