/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Simple.Config.js
 * @path:   js-src/simple/
 * @desc:   Simple公共配置集合
 * @author: yangpengfei@qiyi.com,lichunping@qiyi.com
 * @date:   2014-7-14
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'simple/Simple'
    ],
    function(Simple) {
        Simple.Config = Arm.create('Config', {
            name: 'Simple.Config',
            // TODO: config list,
            GENDER_ENUM: {
                '0': '女',
                '1': '男'
            }
        });
    }
);