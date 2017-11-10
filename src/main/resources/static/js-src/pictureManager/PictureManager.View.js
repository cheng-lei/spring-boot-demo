/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   PictureManager.Config.js
 * @path:   js-src/pictureManager/
 * @desc:   PictureManager模块下页面业对象类
 * @author: wuleii@qiyi.com
 * @date:   2016-09-06
 */

define(
    [
        'pictureManager/PictureManager'
    ],
    function(PictureManager) {
        PictureManager.View = Arm.create('View', {
            name: 'PictureManager.View',
            properties: {
                class: null,
                $albumContainer: null,
                $photoContainer: null,
                $addAlbumContainer: null,
                $alblumTemplate: null,
                $photoTemplate: null,
                $addAlbumTemplate: null,
                $albumView: null,
                $photoView: null,
                $addAlbumBtn: null
            },
            options: {
                albumContainerSelector: '#albumContainer',
                photoContainerSelector: '#photoContainer',
                albumTemplateSelector: '#TemplateAlbumList',
                photoTemplateSelector: '#TemplatePhotoList',
                addAlbumTemplateSelector: '#TemplateAddAlbum',
                addAlbumContainerSelector: '#addAlbumContainer',
                albumViewSelector: '#albumView',
                photoViewSelector: '#photoView',
                addAlbumBtnSelector: '#addAlbum'
            },
            init: function(options) {
                this.class = this.class || this.getClass({});

                //模板一般不在container内，需要通过document查找
                this.$alblumTemplate = $(this.options.albumTemplateSelector);
                this.$photoTemplate = $(this.options.photoTemplateSelector);
                this.$addAlbumTemplate = $(this.options.addAlbumTemplateSelector);

                this.$albumContainer = this.find(this.options.albumContainerSelector);
                this.$photoContainer = this.find(this.options.photoContainerSelector);
                this.$addAlbumContainer = this.find(this.options.addAlbumContainerSelector);

                this.$addAlbumBtn = this.find(this.options.addAlbumBtnSelector);

                this.$albumView = this.find(this.options.albumViewSelector);
                this.$photoView = this.find(this.options.photoViewSelector);
            },
            events: {
                'click #backToAlbum' : 'showAlbumView',
                'click #addAlbum' : 'addAlbum',
                'click #editAlbum': 'editAlbum',
                'click .btn-remove': 'removeAlbum'
            },
            //新建相册图库
            addAlbum: function(){
                var self = this;

                self.$addAlbumContainer.html(self.$addAlbumTemplate.tmpl({}));
                self.$addAlbumContainer.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: "auto",
                    width: 500,
                    modal: true,
                    buttons: {
                        "确认": function() {
                            self.createAlbum();
                            $(this).dialog("close");
                        },
                        "取消": function() {
                            $(this).dialog("close");
                        }
                    }
                });

                self.$addAlbumContainer.dialog('open');
            },
            //相册图库编辑模式
            editAlbum: function(){
                var self = this,
                    $albums = self.$albumContainer.find('li'),
                    $target = $(event.target);

                if(!$albums.hasClass('album-edit')){
                    //通过添加遮罩层的方式屏蔽图库区域里元素绑定的事件处理函数
                    $albums.addClass('album-edit')
                    .find('.style-edit').removeClass('hide');

                    //给图库添加排序拖拽的功能
                    self.$albumContainer.sortable({
                        cursor: "move",
                        items: "li",
                        containment: "parent",
                        placeholder: "album-list style-placeholder",
                        tolerance : "pointer",
                        //revert: "true",
                        opacity: 0.8 //拖动时，透明度为0.8
                    });

                    //更改当前按钮的文字说明
                    $target.text('退出图库编辑模式');

                    self.$addAlbumBtn.addClass('hide');
                }
                else{
                    $albums.removeClass('album-edit')
                    .find('.style-edit').addClass('hide');
                    $target.text('开启图库编辑模式');

                    self.$albumContainer.sortable('destroy');
                    self.$addAlbumBtn.removeClass('hide');
                }
            },
            //移除功能
            removeAlbum: function(){
                var $target = $(event.target),
                    $curAlbum = $target.closest('li');

                $curAlbum.remove();
            },
            //创建图库
            createAlbum: function(){
                var formData = this.$addAlbumContainer.formit('getValues');
                this.class.createAlbum(formData, function(data, status){
                    var content = status == "success" ? "新建图库成功" : "新建图库失败";
                    $.tip({
                        theme: 'success',
                        content: content + data.msg
                    });
                });
            },
            showAlbumView: function(){
                this.$albumView.removeClass('hide');
                this.$photoView.addClass('hide');
            },
            renderPictures: function(){
                var self = this;

                //初始化图片数据
                if(!self.pictureData){
                    self.pictureData = self.class.fetchPictureData(function(){
                        var albumListData = self.class.getPicturesList(),
                            index;

                        //图库渲染    
                        self.render(self.$albumContainer, self.$alblumTemplate, albumListData);

                        var flag = false;
                        self.$albumContainer.on('mouseover', 'li', function(){
                            $(this).addClass('album-tip');
                        }).on('mouseleave', 'li', function(){
                            $(this).removeClass('album-tip');
                        }).on('click', 'img, .album-link', function(){
                            var $curAlbum = $(this).closest('li'),
                                key = $curAlbum.attr('data-key'),
                                photoData = self.class.getPictureDataByKey(albumListData, key);

                            self.render(self.$photoContainer, self.$photoTemplate, photoData.photoList);
                            self.$photoView.find('#albumTitle').text('当前查看的是图库：' + $curAlbum.find('.album-link').text());
                            self.$photoView.removeClass('hide');
                            self.$albumView.addClass('hide');

                            if(flag){
                                //方法1：调用gallery插件，且在每次调用前要先destroy然后重建
                                //self.$photoContainer.pictureGallery('destroy');
                                //方法2：一旦建立了gallery后，每次调用gallery插件时，只用
                                //做更新图片集合和options选项的操作,从而减少插件destroy的开销
                                self.$photoContainer.pictureGallery('updateGallery');
                            }
                            else{
                                self.$photoContainer.pictureGallery();
                            }
                            flag = true;
                        });
                    });
                }
            },
            run: function() {
                this.renderPictures();
            }
        });
    }
);
