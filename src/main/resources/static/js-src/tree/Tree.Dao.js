/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 * 
 * @file:   Tree.Dao.js
 * @author: wangzhaohui@qiyi.com
 */
qui(function() {
	Tree.Dao = Arm.create('Dao', {
		name: 'Tree.Dao',
		'getGridData': function(url, handle){
			this.ajax(url, 'GET', '', handle);
		}
	});
});
