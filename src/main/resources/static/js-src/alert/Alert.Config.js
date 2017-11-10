/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Alert.Config.js
 * @path:   js-src/alert/
 * @desc:   Alert模块公共配置集合
 * @author: zhangzhao@qiyi.com
 * @date:   2016-03-08
 */

qui(function() {
	Alert.Config = Arm.create('Config', {
		name: 'Alert.Config',
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
            }]
        });
});
