/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Linkage.Class.js
 * @path:   js-src/linkage/
 * @desc:   Linkage模块下基础业对象类
 * @author: liuminghua@qiyi.com
 * @date:   2015-08-06
 */

qui(function() {
    Linkage.Class = Arm.create('Class', {
        name: 'Linkage.Class',
        properties: {
            cityList: null,
            areaList: null
        },
        // 初始化函数，包括数据初始化，属性赋值等
        init: function(options) {
            this.logger = Logger.get(this);
        },

        setCityList: function(data) {
            var list = this.cityList;
            if(list instanceof Arm.ArrayList) {
                list.update(data);
            } else {
                this.cityList = new Arm.ArrayList(data);
            }
        },
        getCityList: function() {
            return this.cityList;
        },
        getCityData: function(callback) {
            var self = this;
            self.action.getDao().getCitys({}, {
                success: function(response) {
                    if(response.data) {
                        self.setCityList(response.data);
                        self.logger.log('getCityData', 'Data:', response.data, 'cityList:', self.cityList);
                        callback.call(self, response.data);
                    }
                },
                fail: function() {
                    console.log('Ajax Failure!');
                }
            });
        },

        setAreaList: function(data) {
            var list = this.areaList;
            if(list instanceof Arm.ArrayList) {
                list.update(data);
            } else {
                this.areaList = new Arm.ArrayList(data);
            }
        },
        getAreaList: function() {
            return this.areaList;
        },
        getAreaData: function(data, callback, url) {
            var self = this;
            self.action.getDao().getAreas(data, {
                success: function(response) {
                    if(response.data) {
                        self.setAreaList(response.data);
                        self.logger.log('Class.getDao.getAreas', 'Data:', response.data, 'areaList:', self.areaList);
                        callback.call(self, response.data);
                    }
                },
                fail: function(response) {
                    self.setAreaList(response.data);
                    self.logger.log('Get areas Failure!', 'response.data:',response.data, 'areaList:', self.areaList);
                },
                error: function(response) {
                    console.log('Error! response.data:' + response.data);
                }
            }, url);
        },
        getFormParam: function($form) {
            var self = this;
            return $form.formit('getParamObj', {
                'tel': function ($form, originObj) {
                    self.logger.log('getFormParam', 'Arguments:', arguments, 'Element:', this);
                }
            });
        },
        showParam: function(param, callback) {
            this.getDao().showParam(param, callback);
        }
        // setUrlParam未使用
        // setUrlParam: function() {
        //     var self = this;
        //     var name, value;
        //     var str = window.location.search; //取得参数部分
        //     var num = str.indexOf("?");
        //     str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        //     var arr = str.split("&"); //各个参数放到数组里
        //     for(var i = 0; i < arr.length; i++){
        //         num = arr[i].indexOf("=");
        //         if(num > 0){
        //         name = arr[i].substring(0, num);
        //         value = arr[i].substr(num + 1);
        //         self.find("[name='" + name + "']").val(value);
        //         }
        //     }
        //     // var echoFields = ['city', 'id'];
        //     // var city = Com.url.getParameter('city');
        //     // self.find("[name='city']").val(city);
        //     // 获取需要回填的数据,整理数据成为自己需要的,回填数据
        // }
    });
});