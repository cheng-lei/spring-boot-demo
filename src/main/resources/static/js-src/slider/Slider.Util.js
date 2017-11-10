/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Slider.Util.js
 * @author: yanghuan@qiyi.com
 */

qui(function() {
    Slider.Util = Arm.create('Util', {
        name: 'Slider.Util',

        getSliderPosition: function(sliderEle) {
            var position = {};
            var offset = $(sliderEle).offset();
            position.xx = offset.left + parseInt($(sliderEle).find('span').css('left'), 10) - 23;
            position.yy = offset.top - 33;
            return position;
        },

        getPictureNewLeft: function($container, index) {
            var $items = $container.find('td');
            var width = $items.length * 131 - parseInt($container.find('.panel-body:first').css('width'), 10) + 10;
            var newLeft = 17 + parseInt(width, 10)/100 * index;
            return newLeft;
        }
    });
});
