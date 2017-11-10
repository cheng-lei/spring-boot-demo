/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   Alert.View.js
 * @path:   js-src/alert/
 * @desc:   Alert模块页面对象类
 * @author: zhangzhao@qiyi.com
 * @date:   2016-03-08
 */
define(
    [
        'alert/Alert'
    ],
    function(Alert) {
        Alert.View = Arm.create('View', {
            name: 'Alert.View',
            properties: {
                $dialogNewAlbum: null,//弹框模板
                userinfoItemLength: 1,
                userInfoItems: null,
                $form: null
            },
            options: {
                menuElement: '#showMenu',
                userinfoSelector: '.userinfo-block',
                suggestTagSelector: ".suggest-tag",
                tform: "#alertForm"
            },
            init: function(options) {
                this.userInfoItems = this.action.getConfig().userInfoItems || [];
                this.$form = this.find(this.options.tform);
                this.class = this.class || this.getClass({});
                this.logger = Logger.get(this);
                this.bindEvent();
            },
            events: {
                'click #Submit': 'submit'
            },

            bindEvent: function() {
                var self = this;

                self.find(self.options.suggestTagSelector).suggest({
                    source: 'data/alert/cities.json',
                    valueKey: 'uuid', // 指定data-id同步的属性值
                    labelKey: 'label', // 用来显示的标签值，最终处理(如高亮)后显示的文本存储在_displayKey指定的字段
                    template: function(item) {
                        return '<span>' + item[this._displayKey] + '</span><br/><span style="font-size:10px; color:grey; text-align:left;">' + item.desc + '</span>';
                    },
                    header: '城市',
                    footer: '结果底部'
                });

                self.find(self.options.userinfoSelector).addndel({
                    rowClass: 'form-group',
                    addDecorator: function($newRow, $clickedRow) {
                        self.addUserInfoRow.call(self, $newRow, $clickedRow);
                    },
                    delDecorator: function($deletedRow) {
                        self.delUserInfoRow.call(self, $deletedRow);
                    }
                });

            },

            addUserInfoRow: function($newRow, $clickedRow) {
                var self = this;
                var placeholder, text, name, value;
                var dateInputName = 'birthday';
                var $userBlock = self.find(self.options.userinfoSelector);
                var _setAttr = function($row, item) {
                    if ('object' != typeof item) {
                        return;
                    }
                    var input = $row.find('input[type=text]')[0];
                    input.name = item.name;
                    input.value = item.value || '';
                    input.placeholder = '请输入' + item.text;
                    $row.find('.control-label').text(item.text);
                    // if (item.must) {
                    //     $row.find('.control-label').append($('<span class="form-must">*</span>'));
                    // }
                    if (item.name == dateInputName) {
                        self.bindDatepicker(input);
                    }
                };
                var items = $userBlock.find('input[type=text]').map(function() {
                    return this.name;
                }).toArray();
                this.userinfoItemLength = items.length + 1;
                var addedItem = self.action.getUtil().findItemNotInList(items, self.action.getConfig().userInfoItems);

                _setAttr($newRow, addedItem);

                self.logger.log('addUserInfoRow', 'userinfoItemLength:', this.userinfoItemLength, 'userInfoItems.length:', this.userInfoItems.length);

                if (this.userinfoItemLength == self.action.getConfig().userInfoItems.length) {
                    $newRow.find('.btn').removeClass('add').addClass('del').text('删除');
                }
                return true;
            },

            _getLastNode: function($currentNode) {
                var $lastChild = $currentNode.parent().children(':last-child');
                return $lastChild[0] === $currentNode[0] ? $lastChild.prev() : $lastChild;
            },

            delUserInfoRow: function($deletedRow) {
                var $lastChild = this._getLastNode($deletedRow);
                $lastChild.find('.btn').removeClass('del').addClass('add').text('添加');
                return true;
            },

            submit: function() {
                var self = this;
                var data = self.class.getAlertParam(self.$form);
                self.logger.log('save', 'Data before save:', data);
                self.class.setAlertModel(data);
                var param = self.class.getAlertModel().toPlainJSON();
                self.class.saveAlertModel(param, function(data, status) {
                    self.logger.log('save', 'Save result:', data);
                    var content = status == 'success' ? '操作成功。' : '操作失败';
                    $.tip({
                        theme: 'success',
                        content: content + data.msg
                    });
                });
            },

            getValidator: function() {
                var self = this;
                var config = self.action.getConfig();
                var options = $.extend(config.validatorDefault, config.validator);
                return Validator.getValidator(self.$form, options);
            },

            run: function() {
                var self = this;

                //menuItemsShow使用的可选配置项以及默认值
                // options: {
                //     url: "", //一级菜单请求数据的url，二级菜单默认在相同根目录下，以value值命名的json文件
                //     text:"value", //复选框显示的text的取值字段
                //     value:"id", //复选框value的取值字段
                //     width: 600,  //画布的宽度
                //     height: 340,   //画布的高度
                //     title: "菜单",
                //     dataName: "menuData", //菜单数据提交时的字段名 
                //     lableParentTempl: '<div><label class="checkbox-inline"><input type="checkbox" name="parentItems" class="parent-name" value="${id}">${value}</label></div>',
                //     lableChildTempl: '<div><label class="checkbox-inline"><input type="checkbox" name="childItems" class="child-name" value="${id}">${value}</label></div>',
                //     //获得二级菜单的请求数据的文件地址，默认参数为点击的对象
                //     getChildFileName: function($ele){
                //         return $ele.val()+'.json';
                //     }
                // },
                $(self.options.menuElement).menuItemsShow({
                    url:'./data/alert/menuItem.json',
                });
            }
        });
    }
);