/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Login.Config.js
 * @author: lichunping@qiyi.com
 */

qui(function() {

    Login.Config = Arm.create('Config', {
        name: 'Login.Config',
        LOGIN_VALIDATORS: {
            messages: {
                "user.id": {
                    "required": "还没填写ID"
                },
                "user.password": {
                    "required": "还没填写密码"
                }
            },
            rules: {
                "user.id": {
                    "required": true
                },
                "user.password": {
                    "required": true
                }
            }
        },
        REGISTER_VALIDATORS: {
            messages: {
                "user.id": {
                    "required": "必填项"
                },
                "user.sex": {
                    "required": "必填项"
                },
                "user.password": {
                    "required": "必填项"
                },
                "user.repassword": {
                    "required": "必填项",
                    "equalTarget": "两次输入密码不一致"
                },
                "user.birthday": {
                    "required": "必填项",
                    "date": "格式：YYYY-mm-dd"
                }
            },
            rules: {
                "user.id": {
                    "required": true,
                    "validateID": true
                },
                "user.sex": {
                    "required": true
                },
                "user.password": {
                    "required": true,
                    "hasLowerCase": true,
                    "hasUpperCase": true,
                    "minPSWLength": true,
                    "hasNumber": true
                },
                "user.repassword": {
                    "required": true,
                    "equalTarget": {
                        $target: $("[name='registerForm'] [name='user.password']")
                    }
                },
                "user.birthday": {
                    "required": true,
                    "date": true
                }
            }
        }
    });
});