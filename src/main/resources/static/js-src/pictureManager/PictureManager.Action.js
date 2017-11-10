/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 * 
 * @file:   PictureManager.Action.js
 * @path:   js-src/pictureManager/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: wuleii@qiyi.com
 * @date:   2016-09-06
 */

define(
    [
        'pictureManager/PictureManager'
    ],
    function() {
        PictureManager.Action = Arm.create('Action', {
            name: 'PictureManager.Action'
        });
    }
);