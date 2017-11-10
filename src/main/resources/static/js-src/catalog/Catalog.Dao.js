/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 * 
 * @file:   Catalog.Dao.js
 * @path:   js-src/catalog/
 * @desc:   负责Catalog模块远程调用的静态对象
 * @author: yangpengfei@qiyi.com
 * @date:   2014-11-28
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'catalog/Catalog'
    ],
    function(Catalog) {
        Catalog.Dao = Arm.create('Dao', {
            name: 'Catalog.Dao',
            saveCatalog:  function(data, handle, url) {
                url = url || './data/list.json';
                this.ajax(url, 'GET', data, handle);
                Logger.get(this).log('saveCatalog', 'Data:', data);
            }
        });
    }
);