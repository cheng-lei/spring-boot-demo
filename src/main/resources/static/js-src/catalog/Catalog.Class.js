/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Catalog.Class.js
 * @path:   js-src/catalog/
 * @desc:   Catalog模块下基础业对象类
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
        Catalog.Class = Arm.create('Class', {
            name: 'Catalog.Class',
            properties: {
                catalogModel: null
            },

            options: {},
            init: function() {
                this.logger = Logger.get(this);
            },
            getStoreData: function() {
                // 模拟的原始数据
                var data = {
                    title: '神雕侠侣电影版',
                    category: '1001',
                    subject: [5012, 5013],
                    mode: 'M3030',
                    dub: [7101, '7104'],
                    description: '杨过与小龙女的故事',
                    platform: ['2002', '2003']
                };
                return data;
            },

            setCatalogModel: function(catalogModel) {
                if (this.catalogModel instanceof Arm.Model) {
                    this.catalogModel.update(catalogModel);
                } else {
                    this.catalogModel = new Arm.Model(catalogModel);
                }
            },

            getCatalogModel: function() {
                return this.catalogModel;
            },

            // 数据再处理
            processCatalogModel: function () {
                var data = this.getCatalogModel();
                data.format({
                    // 如果是直接量则赋值
                    brand: 'PPS',
                    // 如果value为null或undefined则表示使用默认格式器
                    title: null,
                    people: undefined,
                    // 如果是函数则按函数处理，value为原来的value，data为整个对象
                    mode: function(value, data) {
                        return value + '||' + value;
                    }
                },
                // 修改默认格式器
                function (value, data) {
                    if (value === '') {
                        return '空字符串';
                    } else {
                        return '【' + value + '】';
                    }
                });
            },

            // class 处理数据获取以及数据整理相关的逻辑
            // view 通过class调用dao
            getCatalogParam: function($form) {
                // 数据获取相关可以放到class中处理
                var options = {

                    // 自定义获取参数的方法
                    title: function($form, data) {
                        return this.value ?
                            this.value + '__' + encodeURIComponent(this.value) : '[empty!][message from custom method]';
                    },

                    // 从属性获取值
                    album: 'data-album-id',

                    platform: function($form, data) {
                        // var values = $(this).formit('getValue');
                        // return values && values.join(',');
                        return data.platform && data.platform.join(',');
                    },

                    // return user difine value with key 'music'
                    music: function($form, data) {
                        // custom key-value
                        return 'forever(return_from_custom_function)';
                    },

                    extra: function($form, data) {
                        var dt = new Date();
                        return dt.toUTCString() + '(return_from_custom_function)';
                    }
                };

                var fiConfig = {
                    // 通过data-post-name属性的值指定input的name
                    postName: 'data-post-name',
                    // 通过data-post-attr属性的值设置input的对应属性为value
                    // 如 data-post-attr="data-id"，则将data-id属性的值作为该input的值
                    postAttr: 'data-post-attr',    // 
                    ignore: '.fi-ignored'    // 忽略的字段
                };

                // 通过`getParamObj`方法获取表单参数，调用方法
                // $form.formit('getParamObj', [options], [fiConfig])
                return $form.formit('getParamObj', options);
            },

            saveCatalogModel: function(param, callback) {
                var self = this;
                self.processCatalogModel();
                var data = param || self.getCatalogModel().toPlain();
                this.logger.log('saveCatalogModel', 'Data:', data);
                this.action.getDao().saveCatalog(data, {
                    success: function(response) {
                        callback.call(self, response, 'success');
                    },
                    fail: function() {
                        callback.call(self, response, 'fail');
                    }
                });
            }
        });
    }
);