/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Viwepager.Config.js
 * @path:   js-src/viwepager/
 * @desc:   Viwepager模块下页面业对象类
 * @author: zhangxiaojing@qiyi.com
 * @date:   2016-07-19
 */

define(
    [
        'viwepager/Viwepager'
    ],
    function(Viwepager) {
        Viwepager.View = Arm.create('View', {
            name: 'Viwepager.View',
            properties: {
            },

            options: {
            },

            events: {
                'click .magnifier-disable-btn': 'toggleMagnifierPluginActivity',
                'click .magnifier-magnifier-btn': 'toggleMagnifierActivity'
            },

            init: function() {
                this.$carousel = $(".carousel");
                this.$imgBox = this.find(".carousel-inner");
                this.$disableBtn = this.find(".magnifier-disable-btn");
                this.$magnifierBtn = this.find(".magnifier-magnifier-btn");
            },
  
            run: function() {
                this.$carousel.carousel({
                    interval: 3600
                });

                //放大镜插件 
                //一：调用者为img的父级
                this.$imgBox.magnifier();

                //二：调用者为img的集合
                // this.$imgBox.find("img").magnifier({
                //     reference: this.$imgBox
                // });

                //三：调用者为某img
                // var firstImg = this.$imgBox.find("img").eq(0);
                // firstImg.magnifier({
                //     reference: this.$imgBox
                // });
                // var secondImg = this.$imgBox.find("img").eq(1);
                // secondImg.magnifier();

            },

            toggleMagnifierPluginActivity: function() {
                this.$imgBox.magnifier("disable");
            },

            toggleMagnifierActivity: function() {
                this.$imgBox.magnifier("controlMagnifier");
            }
        });
    }
);
