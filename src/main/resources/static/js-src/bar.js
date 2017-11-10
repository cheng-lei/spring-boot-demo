qui(
    'bar', [
        // 或把base下文件全部引入进来
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'bar/Bar',
        'bar/Bar.Config',
        'bar/Bar.Util',
        'bar/Bar.Action',
        'bar/Bar.Class',
        'bar/Bar.View',
        'bar/Bar.Dao'
    ], function(){
        console.log('bar loaded!');
    }
);
