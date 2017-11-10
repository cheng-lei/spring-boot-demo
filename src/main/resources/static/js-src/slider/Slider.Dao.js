/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 * 
 * @file:   Slider.Dao.js
 * @author: yanghuan@qiyi.com
 */
qui(function() {
    Slider.Dao = Arm.create('Dao', {
        name: 'Slider.Dao',

        getData: function(data, handle, url) {
            url = url || './data/slider.json';
            this.ajax(url, 'GET', data, handle);
        },

        saveData: function(data, handle, url) {
            url = url || './data/pictureInfo.json';
            this.ajax(url, 'GET', data, handle);
        }
    });
});
