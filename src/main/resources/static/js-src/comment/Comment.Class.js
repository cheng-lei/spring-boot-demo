/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Comment.Class.js
 * @path:   js-src/comment/
 * @desc:   Comment模块下基础业对象类
 * @author: zhumin@qiyi.com,lichunping@qiyi.com
 * @date:   2015-03-11
 */

define(
    [
        'comment/Comment'
    ],
    function(Comment) {
        Comment.Class = Arm.create('Class', {
            name: 'Comment.Class',
            properties: {
                commentList: null
            },

            // 定义具体业务数据对象，用来进行数据预处理
            // 所有供处理的对象应为ArrayList或HashMap(Model)
            options: {
            },

            // 初始化函数，包括数据初始化，属性赋值等
            init: function(options) {
                this.logger = Logger.get(this);
            },

            setCommentList: function(data) {
                var list = this.commentList;
                if (list instanceof Arm.ArrayList) {
                    list.update(data);
                } else {
                    this.commentList = new Arm.ArrayList(data);
                }
            },

            getCommentList: function() {
                return this.commentList;
            },

            getCommentData: function(data, callback) {
                var self = this;
                self.action.getDao().getComments(data, {
                    success: function(response) {
                        if (response.data) {
                            self.setCommentList(response.data);

                            self.logger.log('getComments', 'Data:', response.data, 'commentList:', self.commentList);
                            callback.call(self, response.data);
                        }
                    }

                });
            },

            saveComment: function(data, callback) {
                var self = this;
                self.action.getDao().saveComment(data, {
                    success: function(response) {
                        if (response.data) {
                            self.logger.log('saveComment', 'Data:', response.data);
                            callback.call(self, response.data);
                        }
                    }
                });
            },

        });
    }
);