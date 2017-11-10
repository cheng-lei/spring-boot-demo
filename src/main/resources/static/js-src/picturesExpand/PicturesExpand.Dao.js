/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 * 
 * @file:   PicturesExpand.Dao.js
 * @author: lichunping@qiyi.com
 */
define(
	[
        'picturesExpand/PicturesExpand'
    ],
	function() {
		PicturesExpand.Dao = Arm.create('Dao', {
			name: 'PicturesExpand.Dao',
			getImagesSrcData: function(handle, url) {
				url = url || './data/imageSrcUrlData.json';
				this.ajax(url, 'GET', '', handle);
			}
		});
	}
);
