qui(
    'login', [
        'base/Base',
        'base/Base.Config',
        'base/Base.Util',
        'base/Base.Action',
        'base/Base.Class',
        'base/Base.View',
        'base/Base.Dao',
        'login/Login',
        'login/Login.Config',
        'login/Login.Util',
        'login/Login.Action',
        'login/Login.Class',
        'login/Login.View',
        'login/Login.Dao'
    ],
    function() {
        console.log('qui load done:', 'Login');
    }
);