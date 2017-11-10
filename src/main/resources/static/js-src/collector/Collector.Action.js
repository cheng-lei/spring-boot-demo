/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Collector.Action.js
 * @path:   js-src/hello/
 * @desc:   Action静态对象，声明对象以及部分绑定事件、对外接口等
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
		Collector.Action = Arm.create('Action', {
			name: 'Collector.Action'
		});
	}
);