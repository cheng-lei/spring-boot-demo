qui(
    'collector', [
        // 或把base下文件全部引入进来
        'base',
        'collector/Collector',
        'collector/Collector.Config',
        'collector/Collector.Util',
        'collector/Collector.Action',
        'collector/Collector.Class',
        'collector/Collector.View',
        'collector/Collector.Dao'
    ], function(){
        console.log('collector loaded!');
    }
);
