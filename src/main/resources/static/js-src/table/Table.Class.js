/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.Class.js
 * @path:   js-src/table/
 * @desc:   Table模块下基础业对象类
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [
        'table/Table'
    ],
    function(Table) {
        Table.Class = Arm.create('Class', {
            name: 'Table.Class',
            properties: {
                people: null,
                queryData: null
            },
            // 定义具体业务数据对象，用来进行数据预处理
            // 所有供处理的对象应为ArrayList或HashMap(Model)
            options: {

            },

            init: function() {
                this.logger = Logger.get(this);
            },

            setPeople: function(people) {
                if (this.people instanceof Arm.Model) {
                    this.people.update(people);
                } else {
                    this.people = new Arm.Model(people);
                }
            },

            getPeople: function() {
                return this.people;
            },

            getQueryParam: function($form) {
                var self = this;
                return $form.formit('getParamObj', {
                    skill: function($form, robj) {
                        return self.action.getUtil().getTagValueString(this, $form, robj);
                    }
                });
            },

            getPeopleParam: function($form) {
                var self = this;
                return Formit.getParamObj($form, {
                    // 干预数据
                    skill: function($form, robj) {
                        return self.action.getUtil().getTagValueString(this);
                    }
                });
            },

            processPeople: function(formatter) {
                var self = this;
                var data = this.getPeople();
                formatter = formatter || {
                    sex: function(value) {
                        if ( isNaN( Number(value) ) ) {
                            return self.action.getUtil().getGenderValueByText(value);
                        }
                        return value;
                    }
                };
            },

            getURLParameters: function() {
                var param = Com.url.getParameters();
                if ( $.isEmptyObject(param) ) {
                    return null;
                }
                return param;
            },

            savePeople: function(callback) {
                var self = this;
                self.processPeople();
                var data = self.getPeople().toPlainJSON();
                self.logger.log('savePeople', 'Data:', data, 'People:', self.getPeople());
                self.action.getDao().savePeople(data, {
                    success: function(response) {
                        self.action.getDao().success();
                        callback.call(self, response.data);
                    }
                });
            }
        });
    }
);