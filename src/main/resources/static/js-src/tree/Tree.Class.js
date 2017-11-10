/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Tree.Class.js
 * @author: wangzhaohui@qiyi.com
 */

qui(function() {
	Tree.Class = Arm.create('Class', {
		name: 'Tree.Class',
		properties: {
		},
		options: {
			abcHashMap: null,
			abcModel: null,
			abcList:  null
		},
		init: function(options) {
			// the Global objects
			this.dao = this.getDao();
		},
		/**
		 * get TV grid data from server
		 * @name getGridData(node, url, callback)
		 * @param {Object} node the selected tree node
		 * @param {String} url the request url
		 * @param {Function} callback the callback function after sever reponses 
		 */
		getGridData: function(node, url, handle){
			var newUrl = url || '../../data/tree/json/table/' + node.id + '-table.json?t=' + new Date().getTime();
			console.log(newUrl+",newUrl");
			this.dao.getGridData(newUrl, handle);

		},

		setAbcList: function(abcList) {
			var list = this.options.abcList;
			if (list instanceof Arm.ArrayList) {
				list.update(abcList);
			} else {
				list = new Arm.ArrayList(abcList);
			}
		},

		getAbcList: function() {
			return this.options.abcList;
		},

		setAbcModel: function(abcModel) {
			var model = this.options.abcModel;
			if (model instanceof Arm.Model) {
				model.update(abcModel);
			} else {
				model = new Arm.Model(abcModel);
			}
		},

		getAbcModel: function() {
			return this.options.abcModel;
		}
	});
});
