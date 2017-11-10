/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.Config.js
 * @path:   js-src/hello/
 * @desc:   公共配置集合
 * @author: zhangyao@qiyi.com
 * @date: 2015-01-20
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'collector/Collector'
    ],
    function(Collector) {
        Collector.Config = Arm.create('Config', {
            name: 'Collector.Config',
            userInfoItems: [{
                name: 'userName',
                text: '姓名',
                must: true
            }, {
                name: 'mobilePhone',
                text: '移动电话',
                must: true
            }, {
                name: 'email',
                text: '邮箱',
                must: true
            }, {
                name: 'qq',
                text: 'QQ',
                must: false
            }, {
                name: 'blog',
                text: '博客',
                must: false
            }, {
                name: 'birthday',
                text: '生日',
                must: false
            }],

            validatorDefault: {
                 invalidHandler: function (event, validator) {
                    var errors = validator.numberOfInvalids();
                    if (errors) {
                        $('.page-alert-valud-error').show();
                    }
                }
            },

            validator: {
                rules: {
                    userName: {
                        required: true,
                        minlength: 2
                    },
                    mobilePhone: {
                        mobilePhone: true,
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    mostLikePopularStar: {
                        suggestRequired: true
                    }
                },
                messages: {
                    userName: {
                        required: '姓名不能为空！',
                        minlength: '最小长度为两个字符！'
                    },
                    mobilePhone: {
                        mobilePhone: '请输入1开头的11位数字！',
                        required: '移动电话不能为空！'
                    },
                    email: {
                        required: '邮箱不能为空！',
                        email: '请输入有效邮箱！'
                    },
                    mostLikePopularStar: {
                        suggestRequired: '请至少选择一位明星！'
                    }
                }
            },
            messager: {
                success: '保存成功：',
                fail: '保存失败：',
                error: '保存错误：'
            }
        });
    }
);