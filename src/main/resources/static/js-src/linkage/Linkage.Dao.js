/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Linkage.Dao.js
 * @path:   js-src/linkage/
 * @desc:   Linkage模块远程调用的静态对象
 * @author: liuminghua@qiyi.com
 * @date:   2015-08-06
 */

qui(function() {
    Linkage.Dao = Arm.create('Dao', {
        name: 'Linkage.Dao',
        getCitys: function(data, handle, url) {
            url = url || './data/linkage/cityInfo.json';
            Logger.get(this).log('getCitys', 'Arguments:', arguments);
            this.ajax(url, 'GET', data, handle);
        },
        getAreas: function(data, handle, url) {
            Logger.get(this).log('getAreas', 'Arguments:', arguments);
            this.ajax(url, 'GET', data, handle);
        },
        showParam: function(data, callback) {
            var url = window.location.pathname;
            this.ajax(url, 'get', data, callback);
        }
    });
});