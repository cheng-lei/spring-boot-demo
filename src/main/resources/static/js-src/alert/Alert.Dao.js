/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Alert.Dao.js
 * @path:   js-src/alert/
 * @desc:   Alert模块远程调用的静态对象
 * @author: zhangzhao@qiyi.com
 * @date:   2016-03-08
 */
define(
    [
        'alert/Alert'
    ],
    function(Alert) {
        Alert.Dao = Arm.create('Dao', {
            name: 'Alert.Dao',
            // Ajax请求，保存页面添加的提示信息
            saveAlert:  function(data, handle, url) {
                url = url || './data/list.json';
                this.ajax(url, 'GET', data, handle);
                Logger.get(this).log('saveAlert', 'Data:', data);
            }
        });
    }
);
