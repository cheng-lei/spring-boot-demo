/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   PictureManager.Config.js
 * @path:   js-src/pictureManager/
 * @desc:   PictureManager公共配置集合
 * @author: wuleii@qiyi.com
 * @date:   2016-09-06
 */

define(
    [
        'pictureManager/PictureManager'
    ],
    function() {
        PictureManager.Config = Arm.create('Config', {
            name: 'PictureManager.Config'
        });
    }
);
