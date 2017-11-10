/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   ListPagination.Dao.js
 * @path:   js-src/listPagination/
 * @desc:   负责与server端进行数据交互
 * @author: jianghuifei@qiyi.com
 * @date: 2015-01-27
 */

define(
    [
        'listPagination/ListPagination'
    ],
    function(ListPagination) {
        ListPagination.Dao = Arm.create('Dao', {
            name: 'ListPagination.Dao',

            getList: function(data, handle, url) {
                url = url || './data/ablums.json';
                Logger.get(this).log('getList', 'Arguments:', arguments);
                this.ajax(url, 'GET', data, handle);
            },

            saveInfo: function(data, handle, url) {
                url = url || './data/saveInfo.json';
                Logger.get(this).log('saveInfo', 'Arguments:', arguments);
                this.ajax(url, 'GET', data, handle);

            }
        });
    }
);