/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Slides
 * author: jingtang@qiyi.com
 * date: 2016-7-13
 */
define(
    [
        'slides/Slides'
    ],
    function(Slides) {
        var time = "";
        var index = 1;
        Slides.View = Arm.create('View', {
            name: 'Slides.View',
            properties: {

                class: null

            },
            options: {
                slidesContainer: '#portfolio'

            },
            init: function(options) {
                this.$slidesContainer = this.options.$slidesContainer || this.find(this.options.slidesContainer);
                this.class = this.class || this.getClass({});
                this.logger = Logger.get(this);
            },

            events: {


            },
            //调用轮播图插件，传入图片数量和自动轮播间隔
            carouselSlides: function() {

                $('#portfolio').carousel({
                    picAmount: 5,
                    slidesInterval: 3000
                });


            },



            bindEvent: function() {

            },

            run: function() {
                this.carouselSlides();

            }

        });
    }
);
