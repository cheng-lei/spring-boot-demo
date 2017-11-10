/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Catalog.Util.js
 * @path:   js-src/catalog/
 * @desc:   Catalog静态公共方法
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
        Catalog.Util = Arm.create('Util', {
            name: 'Catalog.Util',

            changeNameWhenSelect: function(e, options) {
                var $form = $(this).closest('form');
                var $opt = $(this).find('option:selected');
                var tg = $opt.attr('data-target');
                var defName = $opt.attr('data-def-name');
                $form.find(tg).attr('name', defName);
            }
        });
    }
);