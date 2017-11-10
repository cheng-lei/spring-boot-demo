/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.Util.js
 * @path:   js-src/table/
 * @desc:   Table静态公共方法
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [
        'table/Table'
    ],
    function(Table) {
        Table.Util = Arm.create('Util', {
            name: 'Table.Util',
            /**
             * 将URL参数变成Object
             * @param  {string} param   参数字符串
             * @returns {object} JSON
             */
            paramToJSON: function(param) {
                return Com.string.paramToJSON(param);
            },

            getGenderTextByValue: function(value) {
                return Table.Config.GENDER_ENUM[value];
            },

            getGenderValueByText: function(text) {
                text = $.trim(text);
                var map = Table.Config.GENDER_ENUM;
                for (var value in map) {
                    if (map[value] === text) {
                        return value;
                    }
                }
            },

            getTagValueString: function(ele, $form, sourceData) {
                var tags = $(ele).suggest('getTagValue');
                tags = new Arm.ArrayList(tags);
                var result = tags.map(function(item) {
                    return item.label;
                });
                return result.join(',');
            },

            setTagValueString: function(ele, $form, value, sourceData) {
                if (!value.length) {
                    return;
                }
                var arr = value.split(','),
                    tags = [];
                arr.forEach(function(item) {
                    tags.push({
                        label: item,
                        value: item
                    });
                });
                $(ele).suggest('removeTags');
                $(ele).suggest('addValues', tags);
            },

            isMale: function(value) {
                return value == '1';
            },

            isFemale: function(value) {
                return value == '0';
            },

            operation: function(v, r) {
                var htmls = [];
                htmls.push('<button type="button" class="btn blue-btn modify">修改</button>');
                htmls.push('<button type="button" class="btn blue-btn remove">删除</button>');
                return htmls.join('');
            }

        });
    }
);