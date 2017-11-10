/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 * 
 * @file:   Legend.Dao.js
 * @author: yanghuan@qiyi.com
 */
define(
    [
        'legend/Legend'
    ],
    function(Legend) {
        Legend.Dao = Arm.create('Dao', {
            name: 'Legend.Dao',
            getData: function(data, handle, url) {
                url = url || './data/infor.json';
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);
