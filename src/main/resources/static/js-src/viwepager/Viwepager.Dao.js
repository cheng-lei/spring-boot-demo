/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Viwepager.Config.js
 * @path:   js-src/viwepager/
 * @desc:   负责Viwepager模块远程调用的静态对象
 * @author: zhangxiaojing@qiyi.com
 * @date:   2016-07-19
 */

define(
    [
        'viwepager/Viwepager'
    ],
    function(Viwepager) {
        Viwepager.Dao = Arm.create('Dao', {
            name: 'Viwepager.Dao'
        });
    }
);