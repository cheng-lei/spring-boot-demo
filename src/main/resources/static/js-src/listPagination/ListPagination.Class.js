/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   ListPagination.Class.js
 * @path:   js-src/listPagination/
 * @desc:   ListPagination模块下基础业处理类
 * @author: jianghuifei@qiyi.com
 * @date: 2015-01-27
 */

define(
    [
        'listPagination/ListPagination'
    ],
    function(ListPagination) {
        ListPagination.Class = Arm.create('Class', {
            name: 'ListPagination.Class',
            properties: {
                albumList: null,
                album: null
            },
            options: {},
            init: function(options) {
                this.setAlbumList(this.albumList);
                this.logger = Logger.get(this);
            },

            getAlbumListData: function(data, callback) {
                var self = this;
                self.logger.log('getAlbumListData', 'Data:', data);
                this.action.getDao().getList(data, {
                    success: function(response) {
                        if (response.data) {
                            self.logger.log('getAlbumListData', 'Data:', response.data);
                            self.setAlbumList(response.data.result);
                            callback.call(self, response.data);
                        }
                    }
                });
            },

            setAlbumList: function(albumList) {
                if (this.albumList instanceof Arm.ArrayList) {
                    this.albumList.update(albumList);
                } else {
                    this.albumList = new Arm.ArrayList(albumList);
                }
            },

            getAlbumList: function() {
                return this.albumList;
            },

            setAlbum: function(album) {
                // Arm.HashMap 或者 Arm.Model，基本类似
                if (this.album instanceof Arm.HashMap) {
                    this.album.update(album);
                } else {
                    this.album = new Arm.ArrayList(album);
                }
            },

            getAlbum: function() {
                return this.album;
            },

            createAlbum: function($form, handler) {
                var self = this;
                var albumData = $form.formit('getParamObj', {
                    // 数据干预
                });
                self.setAlbum(albumData);
                self.logger.log('crateAlbum', 'Data:', albumData, 'Album:', this.getAlbum());
                self.action.getDao().saveInfo(self.getAlbum().toPlain(), handler);
            }

        });
    }
);