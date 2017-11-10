/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 * 
 * @file:   Viwepager.Action.js
 * @path:   js-src/viwepager/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: zhangxiaojing@qiyi.com
 * @date:   2016-07-19
 */


define(
    [
        'viwepager/Viwepager'
    ],
    function(viwepager) {
        Viwepager.Action = Arm.create('Action', {
            name: 'Viwepager.Action'
        });
    }
);