/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   ImageSlider.Action.js
 * @path:   js-src/imageSlider/
 * @desc:  imageSlider模块下页面对象类
 * @author: yuboran@qiyi.com,lichunping@qiyi.com
 * @date:   2016-6-21
 */
define([
    'imageSlider/ImageSlider'
],function(ImageSlider){
    ImageSlider.View=Arm.create('View',{
        name: 'ImageSlider.View',
        properties: {
            class:null,
            //容器
            $imageSliderContainer:null,
            //目标图像
            $targetImage:null,
            //每个slider
            $sliderZoom:null,
            $sliderTransparency:null,
            $sliderGrayScale:null
        },
        options: {
            imageSliderSelector: '#imageSliderContainer',
            targetImageSelector: '#targetImage',
            slidersSelector: '#slidersContainer',
            sliderZoomSelector: '#sliderZoom',
            sliderTransparencySelector: '#sliderTransparency',
            sliderGrayScale: '#sliderGrayScale'
        },

        init: function(){
            this.class=this.class||this.getClass({});
            this.logger=Logger.get(this);
            this.$imageSliderContainer=$(this.options.imageSliderSelector);
            this.$targetImage=$(this.options.targetImageSelector);
            this.$sliderZoom=$(this.options.sliderZoomSelector);
            this.$sliderTransparency=$(this.options.sliderTransparencySelector);
            this.$sliderGrayScale=$(this.options.sliderGrayScale);
        },

        events: {

        },

        addSlider: function(){
            var self=this;
            self.$sliderZoom.simpleSlider({
                sliderBoxWidth:339,
                sliderBoxHeight:132,
                sliderMove:function(){
                    self.callbackZoom();
                }
            });
            self.$sliderTransparency.simpleSlider({
                sliderBoxWidth:339,
                sliderBoxHeight:132,
                sliderMove: function(){
                    self.callbackTransparency();
                }
            });
            self.$sliderGrayScale.simpleSlider({
                sliderBoxWidth:339,
                sliderBoxHeight:132,
                sliderMove: function(){
                    self.callbackGrayScale();
                }
            });
        },

        callbackZoom: function(){
            var value=this.$sliderZoom.simpleSlider('outputPercentage');
            this.action.getUtil().imagesZoom(value,this.$targetImage);
        },

        callbackTransparency: function(){
            var value=this.$sliderTransparency.simpleSlider('outputPercentage');
            this.action.getUtil().imagesTransparency(value,this.$targetImage);
        },

        callbackGrayScale: function(){
            var v=this.$sliderGrayScale.simpleSlider('outputPercentage')/100;
            var grayValue='grayscale('+v+')';
            this.action.getUtil().imagesGrayScale(grayValue,this.$targetImage);
        },

        run: function(){
            this.addSlider();
        }

    });

});
