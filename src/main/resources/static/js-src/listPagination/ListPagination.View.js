/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   ListPagination.View.js
 * @path:   js-src/listPagination/
 * @desc:   ListPagination模块下基础DOM操作类
 * @author: jianghuifei@qiyi.com
 * @date: 2015-01-27
 */

define(
    [
        'listPagination/ListPagination'
    ],
    function(ListPagination) {
        ListPagination.View = Arm.create('View', {
            name: 'ListPagination.View',

            properties: {
                albumData: null,
                class: null,
                $dialogNewAlbum: null,
                $ul: null,
                $templateLi: null,
                pageNo: 1,
                pageSize: 12
            },

            options: {
                templateImageSelector: '#TemplateImageItem',
                templateAlbumSelector: '#TemplateCreateAlbum',
                UlSelector: '#ImageListContainer',
                dialogNewSelector: '#NewAlbumDialog',
                paginationSelector: '#pager'
            },

            init: function(options) {
                var self = this;
                this.logger = Logger.get(this);
                this.$templateLi = $(this.options.templateImageSelector);
                this.$ul = $(this.options.UlSelector);
                var $albumDialog = $(this.options.dialogNewSelector);
                if ($albumDialog.children().length <= 0) {
                    $albumDialog.html($(this.options.templateAlbumSelector).tmpl({}));
                }
                this.$dialogNewAlbum = $albumDialog.dialog({
                    autoOpen: false,
                    resizable: false,
                    height: 340,
                    width: 600,
                    modal: true,
                    buttons: {
                        "确认": function() {
                            self.newAlbum();
                            $(this).dialog("close");
                        },
                        "取消": function() {
                            $(this).dialog("close");
                        }
                    }
                });

                this.class = this.getAction().getClass({
                    ablumList: this.options.albumData
                });

                self.nextPage();
            },

            events: {
                'click .btn-new-album': 'dialog'
            },

            nextPage: function(data, isNew) {
                var self = this;
                var param = $.extend({
                    pageNo: self.pageNo,
                    pageSize: self.pageSize
                }, data);

                self.logger.log("nextPage", 'Param:', param);
                this.class.getAlbumListData(param, function(data) {
                    if (isNew !== false) {
                        self.initPagination(data.totalPages);
                    } else {
                        // 如果不是每次都初始化pagination对象则需实时更新总页码
                        $(self.options.paginationSelector).data('jqPagination').options.max_page = data.totalPages;
                    }

                    var list = self.class.getAlbumList();
                    // 为了演示而自己做的分页，实际情况不用再做处理
                    var start = self.pageSize * (param.pageNo - 1);
                    var end = self.pageSize * param.pageNo;
                    self.logger.log("nextPage:this.class.getAlbumListData", 'PageNo:', param.pageNo,
                        'Start:', start, 'End:', end, 'List:', list.slice(start, end));
                    self.updateULByPagination(list.slice(start, end));
                });
            },

            initPagination: function(total) {
                var self = this;
                var $pager = $(self.options.paginationSelector);
                $pager.removeData('jqPagination');
                $pager.jqPagination({
                    page_string: '{current_page} / {max_page}',
                    max_page: total,
                    paged: function(page) {
                        self.nextPage({
                            pageNo: page
                        }, false);
                    }
                });
            },

            updateULByPagination: function(data) {
                this.renderImageContainer(data);
            },

            newAlbum: function() {
                this.class.createAlbum(this.$dialogNewAlbum);
            },

            dialog: function() {
                this.$dialogNewAlbum.dialog("open");
            },

            renderImageContainer: function(data) {
                if (!data) {
                    data = this.class.getAlbumList();
                }

                this.render(this.$ul, this.$templateLi, data);
            },

            run: function() {
                this.renderImageContainer();
            }
        });
    }
);