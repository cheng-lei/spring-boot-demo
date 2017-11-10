/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   PictureManager.Dao.js
 * @path:   js-src/pictureManager/
 * @desc:   负责PictureManager模块远程调用的静态对象
 * @author: wuleii@qiyi.com
 * @date:   2016-09-06
 */
define(
    [
        'pictureManager/PictureManager'
    ],
    function() {
        PictureManager.Dao = Arm.create('Dao', {
            name: 'PictureManager.Dao',
            getPictureData: function(handle, url) {
                url = url || './data/pictureManager.json';
                this.ajax(url, 'GET', '', handle);
            },
            savePictureData: function(data, handle, url){
                url = url || './data/pictureManager.json';
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);