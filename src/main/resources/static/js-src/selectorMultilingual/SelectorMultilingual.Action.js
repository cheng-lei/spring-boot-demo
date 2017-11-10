/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   SelectorMultilingual.Action.js
 * @path:   js-src/selectorMultilingual/
 * @desc:   Action静态对象，声明对象以及部分绑定事件、对外接口等
 * @author: wangyifeng@qiyi.com
 * @date: 2015-07-14
 */

///import js-src/lib/
///import js-src/com/

define(
	[
		'selectorMultilingual/SelectorMultilingual'
	],
	function(SelectorMultilingual) {
		SelectorMultilingual.Action = Arm.create('Action', {
			name: 'SelectorMultilingual.Action'
		});
	}
);