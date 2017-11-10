/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.js
 * @path:   js-src/hello/
 * @desc:   Collector模块声明
 * @author: zhangyao@qiyi.com
 * @date: 2015-01-20
 */

///import js-src/lib/
///import js-src/com/

define(
    [],
    function() {
        window.Collector = Arm.create('Module', {
            name: 'Collector',
            version: '1.0'
        });
        return Collector;
    }
);
