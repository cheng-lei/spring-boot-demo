/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Echarts
 * author: jingtang@qiyi.com
 * date: 2016-7-13
 */
define(
    [
        'echarts/Echarts'
    ],
    function(Echarts) {
        Echarts.Dao = Arm.create('Dao', {
            name: 'Echarts.Dao',
            getData: function(data, handle, url) {
                url = url || './data/echarts.json';
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);
