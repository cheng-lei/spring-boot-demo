/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   pictureGallery.js
 * @path:   js-src/widget/
 * @desc:   图片画廊
 * @author: wuleii@qiyi.com
 * @date:   2016-09-06
 */

qui.qwidget("qui.pictureGallery", {
    version: "0.0.1",

    $gallery: null,
    $imgs: null,
    $curImg: null,

    //可传入的参数以及默认值
    options: {
        width: "500px",                 //画廊图片区域的宽度
        height: "400px",                //画廊图片区域的高度
        hasButton: "ture",              //画廊是否有图片切换按钮
        layoutOpacity: 0.8              //画廊的遮罩层透明度
    },
    //私有参数
    privateOptions: {
        galleryHtml: "<div class='gallery-container'>"
        + "<div class='img-container'>"
        + "<div class='btn-close'></div>"
        + "<img class='img-size'>"
        + "<span class='glyphicon glyphicon-chevron-left btn-left'></span>"
        + "<span class='glyphicon glyphicon-chevron-right btn-right'></span></div>"
        + "<div class='overlay'></div></div>"
    },
    //对外接口:更新gallery-包括要展示的图片集合和设置
    updateGallery: function(options){
        this.$imgs = this.element.find('img');
        this.options = $.extend(this.options, options);

        this._setGalleryStyle();
    },
    //创建gallery插件
    _create: function() {
        var self = this;

        //创建gallery,初始为隐藏状态
        var $gallery = self._renderGallery();

        //缓存公共数据方便使用
        self.$gallery = $gallery;
        self.$imgs = self.element.find('img');

        //设置gallery的样式
        self._setGalleryStyle();

        //设置事件绑定
        self._setBinds();
    },
    //在页面文档中渲染生成gallery
    _renderGallery: function(){
        var self = this;

        $('.gallery-container').remove();
        $gallery = $(self.privateOptions.galleryHtml).appendTo(document.body);

        //初始化创建的gallery要保证是隐藏的,仅当图片被点击时才显示gallery
        $gallery.hide();

        return $gallery;
    },
    //设置gallery的样式
    _setGalleryStyle: function(){
        var self = this,
            $gallery = self.$gallery;

        //设置gallery居中显示
        $gallery.find('.img-container').css({
            width: self.options.width,
            height: self.options.height,
            "margin-left": -self.options.width / 2,
            "margin-top": -self.options.height / 2
        });

        //设置遮罩层的透明度
        $gallery.find('.overlay').css('opacity', self.options.layoutOpacity);
    },
    //设置gallery的事件处理函数
    _setBinds: function(){
        var self = this,
            $gallery = self.$gallery;

        $gallery.find('.btn-left').click(function(){
            self._showPrev();
        });

        $gallery.find('.btn-right').click(function(){
            self._showNext();
        });

        $gallery.find('.btn-close').click(function(){
            self._close();
        });

        //对待点击图片的父元素做事件绑定
        self.element.on('click', 'img', function(event){
            self._showPicture($(this));     //gallery加载当前图片
        });
    },
    //显示图片
    _showPicture: function($curImg){
        var self = this,
            src = $curImg.attr('src').replace('normal', 'large'),
            $gallery = self.$gallery;

        if($gallery.is(':hidden')) {
            $gallery.show();
        }

        self.$curImg = $curImg;

        $gallery.find('.img-size').attr('src', src);
    },
    //显示上一张图片
    _showPrev: function(){
        var self = this,
            $imgs = self.$imgs,
            index = $imgs.index(self.$curImg);

        if(index === 0){
            return;
        }

        self._showPicture($imgs.eq(index - 1));
    },
    //显示下一张图片
    _showNext: function(){
        var self = this,
            $imgs = self.$imgs,
            index = $imgs.index(self.$curImg);
            
        if(index >= $imgs.length - 1){
            return;
        }

        self._showPicture($imgs.eq(index + 1));
    },
    //关闭gallery
    _close: function(){
        var self = this;

        self.$gallery.hide();
    },
    //初始化页面
    _init: function() {
        var self = this;
    }
});