/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Simple.OtherClass.js
 * @path:   js-src/simple/
 * @desc:   Simple模块下基础业对象类
 * @author: yangpengfei@qiyi.com,lichunping@qiyi.com
 * @date:   2014-7-14
 */

define(
    [
        'simple/Simple'
    ],
    function(Simple) {
        Simple.OtherClass = Arm.create('Class', {
            name: 'Simple.OtherClass',
            properties: {
                employeeList: null
            },

            options: {
                otherVariable: 'undefined variable'
            },

            init: function() {
                this.setEmployeeList(this.employeeList);
            },

            // setEmployeeList: function(data) {
            //     var employeeList = this.employeeList;
            //     if (employeeList instanceof Arm.ArrayList) {
            //         this.employeeList.update(data);
            //     } else {
            //         this.employeeList = new Arm.ArrayList(data);
            //     }
            // },

            // getEmployeeList: function() {
            //     // 这个方法用来bind示例，通过更改this来改变this.employeeList
            //     return this.employeeList;
            // }

        // 这里是继承示范，其中只有方法会继承。 init一般自己重写更好
        }).inherits(Simple.Class);
    }
);