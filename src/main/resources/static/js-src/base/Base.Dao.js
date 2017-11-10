/**
 * Copyright 2013 Qiyi Inc. All rights reserved.
 *
 * @file:   Base.Dao.js
 * @path:   js-src/base/
 * @desc:   负责本模块的远程调用的静态对象
 * @author: lichunping@qiyi.com
 * @date:   2013-04-10
 */

qui(
    function(require, exports, module) {
        Base.Dao = Arm.create('Dao', {
            name: 'Base.Dao',
            success: function(json) {
                $.tip({
                    theme: 'success',
                    content: '操作成功'
                });
            },
            fail: function(json) {
                $.tip({
                    theme: 'error',
                    content: json.msg || '操作失败'
                });
            },
            error: function(err) {
                $.tip({
                    theme: 'error',
                    content: '网络故障'
                });
            },
            ajax: function(url, type, data, handle, param) {
                var callback, success, error, fail;
                var  self = this;
                if (typeof handle == 'function') {
                    callback = handle;
                } else {
                    handle = handle || {};
                    success = handle.success || this.success;
                    error = handle.error || this.error;
                    fail = handle.fail || this.fail;
                }
                param = $.extend({
                    url: url,
                    dataType: 'json',
                    type: type || 'GET',
                    data: data,
                    success: function(json) {
                        if (callback) {
                            callback.call(this, json);
                            return this;
                        }
                        if (json.code == Base.Config.CODE.success) {
                            success.call(this, json);
                        } else {
                            fail.call(this, json);
                        }
                        return this;
                    },
                    error: function(err) {
                        if (callback) {
                            callback.call(this, err);
                            return this;
                        }
                        error.call(this, err);
                        return this;
                    }
                }, param);
                jQuery.ajax(param);
                // Arm._.ajax(param);
            }
        });
    }
);