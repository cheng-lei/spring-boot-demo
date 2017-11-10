/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: PictureManager
 * author: wuleii@qiyi.com
 * date: 2016-09-06
 */
qui(
    'pictureManager', [
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'pictureManager/PictureManager',
        'pictureManager/PictureManager.Config',
        'pictureManager/PictureManager.Util',
        'pictureManager/PictureManager.Action',
        'pictureManager/PictureManager.Class',
        'pictureManager/PictureManager.View',
        'pictureManager/PictureManager.Dao'
    ],
    function() {
        console.log('qui load done:', 'PictureManager');
    }
);