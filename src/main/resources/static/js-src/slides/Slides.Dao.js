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
    function(Echarts) {
        Slides.Dao = Arm.create('Dao', {
            name: 'Slides.Dao',
            getData: function(data, handle, url) {
                url = url || './data/slides.json';
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);
