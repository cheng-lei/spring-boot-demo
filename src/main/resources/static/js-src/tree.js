qui(
    'tree', [
        // 或把base下文件全部引入进来
        'base',
        'tree/Tree',
        'tree/Tree.Config',
        'tree/Tree.Util',
        'tree/Tree.Action',
        'tree/Tree.Class',
        'tree/Tree.View',
        'tree/Tree.Dao'
    ], function(){
        console.log('Tree loaded');
    }
);
