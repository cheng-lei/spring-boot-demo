/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Selector.Action.js
 * @path:   js-src/selector/
 * @desc:   Action静态对象，声明对象以及部分绑定事件、对外接口等
 * @author: wangyifeng@qiyi.com
 * @date: 2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
	[
		'selector/Selector'
	],
	function(Selector) {
		Selector.Action = Arm.create('Action', {
			name: 'Selector.Action'
		});
	}
);