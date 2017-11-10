/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Slides
 * author: jingtang@qiyi.com
 * date: 2016-7-13
 */


qui.qwidget("qui.carousel", {
    version: "0.0.1",

    properties: {
        $numSpan: null,
        $lastSpan: null,
        $nextSpan: null,
        $bannerImg: null
    },
    options: {
        time: "",
        index: 1,
        picAmount: 5,
        slidesInterval: 3000,
        numSpan: '.imgnum span',
        bannerImg: '#banner_img li',
        lastSpan: '.imglast span',
        nextSpan: '.imgnext span'
    },

    _init: function() {

        this.$numSpan = $(this.options.numSpan);
        this.$bannerImg = $(this.options.bannerImg);
        this.$lastSpan = $(this.options.lastSpan);
        this.$nextSpan = $(this.options.nextSpan);
        this.pathsDraw();

    },


    pathsDraw: function() {
        var self = this;
        index = this.options.index;
        time = this.options.time;
        self.showimg(index);
        //鼠标移到某个数字上方
        this.$numSpan.hover(function() {
            var icon = $(this).text();
            self.getNum(icon);
        });

        //鼠标点击下一张按钮
        this.$nextSpan.click(function() {
            self.getnext();
        });

        //鼠标点击上一张按钮
        this.$lastSpan.click(function() {
            self.getlast();
        });
    },
    //播放选中图片
    getNum: function(icon) {
        var self = this;
        clearTimeout(time);
        this.$numSpan.removeClass("onselect").eq(icon - 1).addClass("onselect");
        this.$bannerImg.hide().stop(true, true).eq(icon - 1).fadeIn("slow");

        index = icon > this.options.picAmount - 1 ? 1 : parseInt(icon, 10) + 1;

        function st() {
            self.showimg(index);
        }
        time = setTimeout(st, this.options.slidesInterval);

    },
    //播放下一张图片
    getnext: function() {
        var self = this;
        clearTimeout(time);
        var icon = index;
        this.$numSpan.removeClass("onselect").eq(icon - 1).addClass("onselect");
        this.$bannerImg.hide().stop(true, true).eq(icon - 1).fadeIn("slow");

        index = index + 1 > this.options.picAmount ? 1 : index + 1;

        function st() {
            self.showimg(index);
        }
        time = setTimeout(st, this.options.slidesInterval);

    },
    //播放上一张图片
    getlast: function() {
        var self = this;
        clearTimeout(time);
        var icon = index - 2;
        this.$numSpan.removeClass("onselect").eq(icon - 1).addClass("onselect");
        this.$bannerImg.hide().stop(true, true).eq(icon - 1).fadeIn("slow");

        index = index - 1 < 1 ? this.options.picAmount : index - 1;

        function st() {
            self.showimg(index);
        }
        time = setTimeout(st, this.options.slidesInterval);

    },
    //定时轮播图片
    showimg: function(num) {

        var self = this;
        this.$numSpan.removeClass("onselect").eq(index - 1).addClass("onselect");
        this.$bannerImg.hide().stop(true, true).eq(index - 1).fadeIn("slow");
        index = index + 1 > this.options.picAmount ? 1 : index + 1;

        function st() {
            self.showimg(index);
        }
        time = setTimeout(st, this.options.slidesInterval);
    }



});
