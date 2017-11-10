/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Fibind.Dao.js
 * @path:   js-src/fibind/
 * @desc:   负责Fibind模块远程调用的静态对象
 * @author: yangpengfei@qiyi.com
 * @date:   2015-03-12
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'fibind/Fibind'
    ],
    function(Fibind) {
        Fibind.Dao = Arm.create('Dao', {
            name: 'Fibind.Dao'
        });
    }
);