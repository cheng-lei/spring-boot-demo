/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Base.js
 * @path:   js-src/base/
 * @desc:   系统基本的模块，其他模块均继承该模块的内容
 *          每个系统都有一个自己的base，全局公用
 * @author: lichuning@qiyi.com
 * @date:   2014-04-10
 */

define(
    function(require, exports, module) {
        window.Base = Arm.create('Module', {
            name: 'Base',
            version: '1.0'
        });

        if (Arm) {
            Arm.setBase(Base);
        }
    }
);