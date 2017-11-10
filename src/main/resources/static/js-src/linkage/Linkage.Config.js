/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Linkage.Config.js
 * @path:   js-src/linkage/
 * @desc:   Linkage模块公共配置集合
 * @author: liuminghua@qiyi.com
 * @date:   2015-08-06
 */


qui(function() {
    Linkage.Config = Arm.create('Config', {
        name: 'Linkage.Config',
        VALIDATORS: {
            messages: {
                'telephone': {
                    'required': '请填写电话'
                },
                'postcode': {
                    'required': '请填写邮编'
                }
            },
            rules: {
                'telephone': {
                    'require': true,
                    'isTelNumber': true
                },
                'postcode': {
                    'required': true,
                    'isPostcode': true
                }
            }
        }
    });
});