/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Base.js
 * @path:   js-src/base/
 * @desc:   系统基本的模块，其他模块均继承该模块的内容
 * @author: lichuning@qiyi.com
 * @date:   2014-04-10
 */

define(
    function(require, exports, module) {
        Base.View = Arm.create('View', {
            name: 'Base.View'
        });
    }
);