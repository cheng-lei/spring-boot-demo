/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Module.Class.js
 * @path:   js-src/module/
 * @desc:   Module模块下基础业处理类
 * @author: liuliguo@qiyi.com
 * @date:   2017-1-10
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'bar/Bar'
    ],
    function(Bar) {
        Bar.Class = Arm.create('Class', {
            name: 'Bar.Class',
            properties: {
                data: null,
                canvasWidth: null,
                canvasHeight: null
            },

            options: {
            },

            init: function(options) {
//				this.canvasWidth = $('#tableArea').width();
//				console.log("Bar Class init");
            },
			/**
			 * 读取远程数据
			 * @param {Object} data
			 * @param {Function} callback
			 */
			readData: function(data, callback) {
				var self = this;
                self.action.getDao().getData(data, {
                    success: function(back) {
                        if (back.record) {
                            self.data = back;
                            callback(back);
                        }
                    }
                });
			},
			/**
			 * 获取读取的数据
			 */
			getData: function() {
				return this.data;
			}
        });
    }
);