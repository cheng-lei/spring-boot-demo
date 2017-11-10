/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   PicturesExpand.View.js
 * @author: lichunping@qiyi.com
 */

define(
	[
        'picturesExpand/PicturesExpand',
        'lib/react-production',
        'lib/jsx!picturesExpand/pictureExpandViewOfReact'
    ],
	function(PicturesExpand, React, PictureExpandViewOfReact) {
		PicturesExpand.View = Arm.create('View', {
			name: 'PicturesExpand.View',
			properties: {
				class: null,
				$div: null,
                $templateRow: null,
                mountNode: null,
                expandedPictureNode: null
			},
			options: {
				templateSelector: '#TemplateRow',
                mountNodeSelector: '',
                expandedPictureSelector: ''
			},
			init: function(options) {
				this.logger = Logger.get(this);
                this.$div = this.getContainer();
                // 模板一般不在container内，需要相对document查找
                this.$templateRow = $(this.options.templateSelector);
                // 在int时初始化需要关联的class
                this.class = this.getAction().getClass();

                this.class.setPicturesList(this.options.rowsData);
                this.mountNode = this.find(this.options.mountNodeSelector)[0];
                this.expandedPictureNode = this.find(this.options.expandedPictureSelector)[0];
			},
			events: {
				'click .anchor-item .image-item': 'showImageInfo',
			},
			handlerUserClick: function (expandedImageUrl) {
				this.expandedPictureNode.src = expandedImageUrl;
				this.expandedPictureNode.style.width = "100%";
			},
			fetchImagesUrlData: function(options) {
				var self = this,
					callback = function() {
					//自动从class总获取更新后的图片信息	
					var optionsObj = {
						imgSrcUrlArr: self.class.getImagesUrlData(),
						onUserClick: self.handlerUserClick.bind(self)
					};

					options.callback(optionsObj, self.mountNode);
				};

				self.action.get('Class').fetchImagesUrlData(callback);
			},
			/**
             * 调用React插件来实现页面渲染
             * @function
             * @param {options} object literal, support only two attributes, {imgSrcUrlArr: [], onUserClick: func}
             * @param {mountNode} DOM node, to mount the React Plugin
             * @returns void
            **/
			renderReactView: function(options, mountNode) {
				if(!options || !mountNode) {
					return alert('You forgot some parameter!');
				}
				pictureExpandViewFactory = React.createFactory(PictureExpandViewOfReact);
				React.render(pictureExpandViewFactory(options), mountNode);
			},
			run: function() {
				// this.renderPicture();
				this.fetchImagesUrlData({
					callback: this.renderReactView
				});
			}
		});
	}
);
