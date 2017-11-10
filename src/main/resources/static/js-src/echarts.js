/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Echarts
 * author: jingtang@qiyi.com
 * date: 2016-7-13
 */
qui(
    'echarts', [
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'echarts/Echarts',
        'echarts/Echarts.Config',
        'echarts/Echarts.Util',
        'echarts/Echarts.Action',
        'echarts/Echarts.Class',
        'echarts/Echarts.View',
        'echarts/Echarts.Dao'
    ],
    function() {
        console.log('qui load done:', 'Echarts');
    }
);
