qui(
    'alert', [
        // 或把base下文件全部引入进来
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'alert/Alert',
        'alert/Alert.Config',
        'alert/Alert.Util',
        'alert/Alert.Action',
        'alert/Alert.Class',
        'alert/Alert.View',
        'alert/Alert.Dao'
    ], function(){
        console.log('Alert loaded!');
    }
);
