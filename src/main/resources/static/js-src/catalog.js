/**
 * Copyright 2014 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Catalog
 * author: yangpengfei@qiyi.com
 * date: 2014-09-17
 */
qui(
    'catalog', [
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'catalog/Catalog',
        'catalog/Catalog.Config',
        'catalog/Catalog.Util',
        'catalog/Catalog.Dao',
        'catalog/Catalog.Action',
        'catalog/Catalog.Class',
        'catalog/Catalog.View',
    ],
    function() {
        console.log('qui load done:', 'catalog');
    }
);