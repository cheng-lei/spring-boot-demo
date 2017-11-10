qui(
    'legend', [
        // 或把base下文件全部引入进来
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'legend/Legend',
        'legend/Legend.Config',
        'legend/Legend.Util',
        'legend/Legend.Action',
        'legend/Legend.Class',
        'legend/Legend.View',
        'legend/Legend.Dao'
    ], function(){
        console.log('legend loaded!');
    }
);
