/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Module.Dao.js
 * @path:   js-src/module/
 * @desc:   负责与server端进行数据交互
 * @author: liuliguo@qiyi.com
 * @date:   2017-1-10
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'bar/Bar'
    ],
    function(Bar) {
        Bar.Dao = Arm.create('Dao', {
            name: 'Bar.Dao',
            getData: function(data, handle, url) {
                url = url || './data/infor.json';
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);