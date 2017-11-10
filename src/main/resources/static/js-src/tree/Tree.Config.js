/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Tree.Config.js
 * @author: wangzhaohui@qiyi.com
 */

qui(function() {
    var URI = "<%=request.getRequestURI() %>";
    console.log("URI:"+URI);

    Tree.Config = Arm.create('Config', {
            name: 'Tree.Config',
            TREE_AJAX_URLS: {
                '#':             'roots.json',
                'domestic':      'domestic/domestic.json',
                'hkmacautaiwan': 'hkmacautaiwan/hkmacautaiwan.json',
                'overseas':      'overseas/overseas.json',
                'cctv':          'domestic/cctv/cctv.json',
                'tv':            'domestic/tv/tv.json',
                'hktvb':         'hkmacautaiwan/hktvb/hktvb.json',
                'hkasia':        'hkmacautaiwan/hkasia/hkasia.json',
                'taiwan':        'hkmacautaiwan/taiwan/taiwan.json'
            },
            ICON_NUM: 15, // the number of icons of 'set icon' dialog
            TREE_ICON_FOLDER: '../../data/tree/icon/',
            TREE_JSON_FOLDER: '../../data/tree/json/tree/',
            TREE_TVLOGO_SMALL_FOLDER: '../../data/tree/tv-logo/small/',
            TREE_TVLOGO_MIDDLE_FOLDER: '../data/tree/tv-logo/mid/',
            TREE_CONTEXTMENU_ITEMS_CONFIG: {
                create:      {label: '新建电视台', icon: '../../data/tree/icon/create.png'},
                rename:      {label: '重命名', icon: '../../data/tree/icon/rename.png'},
                remove:      {label: '删除', icon: '../../data/tree/icon/delete.png'},
                ccp:         {label: '编辑', icon: '../../data/tree/icon/edit.png',
                                 submenu: {
                    cut:   {label: '剪切', icon: '../../data/tree/icon/cut.png'},
                    copy:  {label: '复制', icon: '../../data/tree/icon/copy.png'},
                    paste: {label: '粘贴', icon: '../../data/tree/icon/paste.png'}
                }
                             },
                setIcon:     {label: '设置图标', icon: '../../data/tree/icon/setting.png'},
                refreshGrid: {label: '更新节目表', icon: '../../data/tree/icon/update.png'},
                refreshNode: {label: '更新本目录', icon: '../../data/tree/icon/update.png'}
            },
            GRID_CONFIG: {
                'datatype': 'json',
                'height': 500,
                'autowidth': true,
                'rowNum': 20,
                'colNames': ['节目', '类型', '播出时间', '概要'],
                'colModel': [{
                        'name': 'col1',
                        'index': 'col1',
                        'title': false,
                        'width': 150,
                        'sortable': false,
                        'align': 'center'
                    }, {
                        'name': 'col2',
                        'index': 'col2',
                        'title': false,
                        'width': 150,
                        'sortable': false,
                        'align': 'center'
                    }, {
                        'name': 'col3',
                        'index': 'col3',
                        'title': false,
                        'width': 300,
                        'sortable': false,
                        'align': 'center'
                    }, {
                        'name': 'col4',
                        'index': 'col4',
                        'title': false,
                        'width': 300,
                        'sortable': false,
                        'align': 'center'
                    }
                ]
                }
            }
    );
});