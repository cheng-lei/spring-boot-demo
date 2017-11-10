/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Alert.Util.js
 * @path:   js-src/alert/
 * @desc:   Alert模块下静态公共方法
 * @author: zhangzhao@qiyi.com
 * @date:   2016-03-08
 */

qui(function() {
	Alert.Util = Arm.create('Util', {
		name: 'Alert.Util',
		/**
         * 从list中找出不存在arr中的项目,返回第一个
         *
         * @function
         * @param {array} source 目标参数
         * @meta standard
         * @returns {boolean} 类型判断结果
         */
        findItemNotInList: function(arr, list, keyName) {
            keyName = keyName || 'name';
            if (!(arr instanceof Array)) {
                arr = [arr];
            }
            for (var i = 0, l = list.length; i < l; i++) {
                // or use $.inArray
                if (arr.indexOf && arr.indexOf(list[i][keyName]) < 0) {
                    return list[i];
                }
            }
        },
	});
});
