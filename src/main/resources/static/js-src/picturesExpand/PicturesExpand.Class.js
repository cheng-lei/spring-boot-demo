/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   PicturesExpand.Class.js
 * @author: lichunping@qiyi.com
 */

define(
	[
        'picturesExpand/PicturesExpand'
    ],
	function() {
		PicturesExpand.Class = Arm.create('Class', {
			name: 'PicturesExpand.Class',
			properties: {
				picturesList: null,
				pictureInfo: null,
				imageSrcUrlArr: null
			},
			options: {
			},
			init: function(options) {
				this.logger = Logger.get(this);
			},
			setPicturesList: function(picturesList) {
				if (this.picturesList instanceof Arm.ArrayList) {
					this.picturesList.update(picturesList);
				} else {
					this.picturesList = new Arm.ArrayList(picturesList);
				}
			},
			getPicturesList: function() {
				return this.picturesList;
			},
			fetchImagesUrlData: function(callback) {
				var self = this;

				self.getDao().getImagesSrcData({
					success: function(response) {
						//手工更新数据
						self.setImagesUrlData(response.data);
						//执行成功回调
						callback.call(self);
					}
				});
			},
			getImagesUrlData: function() {
				return this.imageSrcUrlArr;
			},
			setImagesUrlData: function(data) {
				this.imageSrcUrlArr = data;
			},
		});
	}
);
