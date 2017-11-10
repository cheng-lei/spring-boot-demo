/**
 * Copyright 2013 Qiyi Inc. All rights reserved.
 *
 * @file:   Base.Config.js
 * @path:   js-src/upload/
 * @desc:   Base公共配置集合，键值对象
 * @author: lichunping@qiyi.com
 * @date:   2013-04-10
 */

qui(
    function(require, exports, module) {
        Base.Config = Arm.create('Config', {
            name: 'Base.Config',
            CODE: {
                success: 'A00000'
            }
        });
    }
);