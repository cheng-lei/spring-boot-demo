/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.Config.js
 * @path:   js-src/tabled/
 * @desc:   Table公共配置集合
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [
        'table/Table'
    ],
    function(Table) {
        Table.Config = Arm.create('Config', {
            name: 'Table.Config',
            GENDER_ENUM: {
                '0': '女',
                '1': '男'
            },
            TABLE_GRID: {
                url: '../data/gridData.json',
                colNames: ['ID', '姓名', '性别', '技能', '操作'],
                gridview: true,
                sortname: 'id',
                idPrefix: 'Table_',
                jsonReader: {
                    root: 'data.result'
                },
                ondblClickRow: function() {
                    alert(this);
                },
                colModel: [{
                    name: 'id',
                    index: 'id',
                    title: false,
                    align: 'center',
                    width: 100
                }, {
                    name: 'name',
                    index: 'name',
                    title: false,
                    align: 'center',
                    width: 200
                }, {
                    name: 'sex',
                    index: 'sex',
                    title: false,
                    align: 'center',
                    width: 300
                }, {
                    name: 'skill',
                    index: 'skill',
                    title: false,
                    align: 'center',
                    width: 200
                }, {
                    name: 'operation',
                    index: 'operation',
                    sortable: false,
                    align: 'center',
                    width: 300,
                    formatter: function(v, o, r) {
                        return Table.getAction().getUtil().operation(v, r);
                    }
                }]
            },
            SUGGEST: {
                localData: ['JQuery', 'JQuery-ui', 'JQuery-mobile', 'Java', 'Jade', 'Jetty', 'Nginx', 'Tomcat', 'Jetty', 'HTML', 'Node.JS', 'CSS', 'C', 'C++', 'C#', 'GO', 'Python'],
                headerHTML: '<p>This is Header</p>',
                footerHTML: '<p>This is Footer</p>'
            }
        });
    }
);