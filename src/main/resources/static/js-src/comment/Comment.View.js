/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Comment.View.js
 * @path:   js-src/comment/
 * @desc:   Comment模块下页面业对象类
 * @author: zhumin@qiyi.com,lichunping@qiyi.com
 * @date:   2015-03-11
 */

define(
    [
        'comment/Comment'
    ],
    function(Comment) {
        Comment.View = Arm.create('View', {
            name: 'Comment.View',
            // 类属性
            properties: {

                class: null,
                $form: null,
                pageNo: 1,
                $panelContatiner: null,
                $templateRow: null,
                $commentInput: null,
                currentCommentList: null
            },

            options: {
                templateSelector: '#TemplateRow',
                panelSelector: '#Panel',
                queryFormSelector: '#ContainerComment',
                commentSelector: '#ComentText',
                operationRowSelector: '.operation-row',
                pageSize: 4
            },

            // 初始化函数，每个view都有，在实例化时会自动执行
            // init主要用来准备容器当中的元素、数据与事件
            init: function(options) {

                this.$form = this.options.$form || this.find(this.options.queryFormSelector);
                this.$templateRow = $(this.options.templateSelector);
                this.$panelContatiner = this.find(this.options.panelSelector);
                this.class = this.class || this.getClass({});
                this.$commentInput = $(this.options.commentSelector);
                this.logger = Logger.get(this);
                // this.bindEvent();
            },

            events: {
                'click #BtnReply': 'reply',
                'click #BtnComment': 'addComment',
                'click #More': 'getMore',
            },

            bindEvent: function() {

            },

            reply: function(evt, ele) {
                var $ele = $(ele);
                var $row = $ele.closest(this.options.operationRowSelector);
                var content = $row.find('.col-content').text();
                var replyId = $row.find('.col-id').text();
                this.$commentInput.val('@' + content);
                this.$commentInput.data('reply-id', replyId);
                this.$commentInput.focus();
            },

            getMore: function(evt, ele) {
                this.pageNo += 1;
                this.getCommentData();
            },

            showLastRow: function (data, $row) {
                var $last = $row || this.$panelContatiner.children(':last');
                var height = $last[0].offsetHeight;
                $last.css({
                    opacity: '0',
                    height: '0'
                }).animate({
                    height: height,
                    opacity:'1',
                });
            },

            addComment: function (evt, ele, addDone) {
                var self = this;
                var value = $.trim(self.$commentInput.val());
                var replyId = self.$commentInput.data('reply-id');
                var len = value.length;
                if (len <= 0) {
                    self.$commentInput.focus();
                    return;
                }
                if (len > 0 && len < 4) {
                    self.$commentInput.tip({
                        theme: 'error',
                        type: 'tip',
                        content: '评论不得少于4个字符'
                    });
                    self.$commentInput.focus();
                    return;
                }
                
                // 用户个人信息应该从页面获取到
                var param = {
                    userId: 1234,
                    replyId: replyId,
                    content: value
                };

                addDone = addDone || self.showLastRow;

                self.class.saveComment(param, function (data) {
                    var item = data[Math.floor(Math.random() * data.length)];
                    self.appendComment($.extend(item, {
                        content: value
                    }));
                    addDone.call(self, data);
                });
            },

            appendComment: function (data) {
                var self = this,
                    $panel = this.$panelContatiner,
                    $tmpl = this.$templateRow;
                if (!(data instanceof Array)) {
                    data = [data];
                }
                var lastNo = $panel.find(self.options.operationRowSelector).length + 1;
                $.each(data, function (i, item) {
                    item.index = i + lastNo;
                });
                var $row = $tmpl.tmpl(data);
                $panel.append($row);
            },

            renderComment: function(data) {
                var self = this,
                    $panel = this.$panelContatiner,
                    $tmpl = this.$templateRow;

                // 可以传递data或者从class中获取commentList来渲染
                data = data || self.getClass().getCommentList();

                // 前端模拟分页，实际使用不用再分页
                var start = 0;
                var end = self.options.pageSize;
                if (self.pageNo > 1) {
                    start = (self.pageNo - 1) * self.options.pageSize;
                    end = start + self.options.pageSize;
                }
                self.logger.log('renderComment', 'Start:', start, 'End:', end, 'Data:', data);
                self.appendComment(data.slice(start, end));
                // self.render($panel, $tmpl, data.slice(start, end));
            },

            getCommentData: function (param, callback) {
                var self = this;
                callback = callback || self.renderComment;
                param = $.extend({
                    pageNo: self.pageNo,
                    pageSize: self.options.pageSize
                }, param);
                this.class.getCommentData(param, function(data) {
                    // callback.call(self, data);
                    callback.call(self);
                    if (self.options.pageSize * self.pageNo >= data.length) {
                        self.find('#More').hide();
                    }
                });
            },

            run: function() {
                this.getCommentData({}, this.renderComment);
            }

        });
    }
);