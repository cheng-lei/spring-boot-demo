qui(
    'simple', [
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'simple/Simple',
        'simple/Simple.Config',
        'simple/Simple.Util',
        'simple/Simple.Action',
        'simple/Simple.Class',
        'simple/Simple.OtherClass',
        'simple/Simple.View',
        'simple/Simple.Dao'
    ],
    function() {
        console.log('qui load done:', 'simple');
    }
);