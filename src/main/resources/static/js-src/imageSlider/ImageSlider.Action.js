/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   ImageSlider.Action.js
 * @path:   js-src/imageSlider/
 * @desc:   Action静态对象，声明对象以及绑定事件、对外接口等
 * @author: yuboran@qiyi.com,lichunping@qiyi.com
 * @date:   2016-6-21
 */
define([   //可以在options声明新的方法，也可以覆盖get,run函数
    'imageSlider/ImageSlider'
],function(){
    ImageSlider.Action=Arm.create('Action',{
        name:'ImageSlider.Action'
    });
});