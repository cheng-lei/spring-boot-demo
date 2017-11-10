/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Linkage.View.js
 * @path:   js-src/linkage/
 * @desc:   Linkage模块下页面对象类
 * @author: liuminghua@qiyi.com
 * @date:   2015-08-06
 */

qui(function() {
    Linkage.View = Arm.create('View', {
        name: 'Linkage.View',
        properties: {
            class: null,
            $form: null,
            $cityRow: null,
            $areaRow: null
        },
        options: {
            citySelector: '#CityRow',
            areaSelector: '#AreaRow',
            container: '.container'
        },
        init: function() {
            this.logger = Logger.get(this);
            var self = this;
            self.class = self.getClass();
            self.$form = self.find('form[name="linkageForm"]');
            self.$multipleForm = self.find('form[name="multipleForm"]');
            self.$city = self.find('select[id="city"]');
            self.$area = self.find('select[id="area"]');
            self.$sex = self.find('select[id="sex"]');
            self.$cityRow = $(this.options.citySelector);
            self.$areaRow = $(this.options.areaSelector);

            self.fillFieldNameWhenChangeSelect(self.$form, 'query-select-control', 'query-input-text');
            self.bindBtnEvents(self.$multipleForm);
        },

        events: {
            'change #city': 'changeCity',
            'change #sex': 'changeSex'
        },
        changeCity: function() {
            var self = this;
            self.getArea({}, self.renderArea, self.$city.val());
        },
        changeSex: function() {
            var self = this;
            var $ele = self.$form.find('.change-sex');
            var selected = $ele.get(0).selectedIndex;//get(0)转化为dom对象,dom对象再取得选中索引
            var $optionname = $($ele.get(0).options[selected]);
            $ele.attr('name', $optionname.attr('name'));
        },
        
        initValidator: function() {
            var self = this,
                config = self.getConfig();
            this.class = this.action.getClass();
            self.action.getUtil().addValidateMethod();

            var errorPlacement = function($error, $element) {
                var $control = $element.closest('.scaffold-input-container');
                $control.addClass('error');
                $control.append($error);
            };
            var validateOptions = {
                ignore: '.ignore',
                errorPlacement: errorPlacement
            };
            self.$form.validate($.extend({}, validateOptions, {
                submitHandler: function(form) {
                    self.saveForm();
                }
            }, config.VALIDATORS));
        },
        saveForm: function() {
            var param = this.class.getFormParam(this.$form);
            this.getClass().showParam(param, this.remoteHandler(param));
        },
        remoteHandler: function(param) {
            return function(data) {
                if (200 == data.status) {
                    qui.tip({
                        contentType: 'html',
                        content: '<p>提交成功！表单数据：</p>' + '<p>' + JSON.stringify(param) + '</p>'
                    });
                } else {
                    qui.tip({
                        content: '请求失败！'
                    });
                }
            };
        },

        //根据下拉选项改变文本域
        fillFieldNameWhenChangeSelect: function($form, elClazzName, fieldClazzName) {
            $form.find('.' + elClazzName).on('change', function() {
                var value = $(this).val();
                var $input = $(this).closest('.form-group').find('.' + fieldClazzName);
                $input.attr('name', value);
            });
        },
        bindBtnEvents: function($form) {
            self = this;
            $form.find('[name="left"]').on('dblclick', function() {
                self.move2otherSide($form, 'left', 'right');
            });
            $form.find('[name="right"]').on('dblclick', function() {
                self.move2otherSide($form, 'right', 'left');
            });
            $form.find('#forward').on('click', function() {
                self.move2otherSide($form, 'left', 'right');
            });
            $form.find('#backward').on('click', function() {
                self.move2otherSide($form, 'right', 'left');
            });
        },
        move2otherSide: function($form, sideName, otherSideName){
            $side = $form.find('[name=' + sideName + ']');
            $otherside = $form.find('[name=' + otherSideName + ']');
            var array = $side.val();//获得选中option列表
            if(array != null){
                for(var i = 0; i < array.length; i++){
                    $otherside.append('<option value="' + array[i] + '">' + array[i] + '</option>');
                    $('[name=' + sideName + '] option[value="' + array[i] +'"]').remove();
                }
            }
        },
        //添加option到下拉列表
        appendOptions: function(data, $des, $opt) {
            var self = this;
            var $row = $opt.tmpl(data);
            $des.empty();
            $des.append($row);
        },

        renderArea: function(data) {
            var self = this;
            data = data || this.getClass().getAreaList().toPlain();
            self.logger.log('renderArea', 'data:', data);
            self.appendOptions(data, self.$area, self.$areaRow);
        },
        getArea: function(param, callback, city) {
            var self = this;
            var url = './data/linkage/' + city + '.json';
            callback = callback || self.renderArea;
            this.class.getAreaData(param, function(data) {
                callback.call(self);
                self.logger.log('After getArea', 'data:', data);
            }, url);
        },

        renderCity: function(data) {
            var self = this;
            data = data || this.getClass().getCityList();
            this.logger.log('renderCity', 'cityList:', data);
            //添加option
            self.appendOptions(data, self.$city, self.$cityRow);
            //回填参数
            this.echoQuery();
        },
        
        echoQuery: function() {
            var self = this;
            var map = self.getEchoQueryConfig();
            if (map) {
                $.each(map, function(key, value) {
                    var param = Com.url.getParameter(key);
                    if (param) {
                        value.handler(value.name, param);
                    }
                });
            }
        },
        getEchoQueryConfig: function() {
            var self = this;
            var idHandler = function(name, value) {
                var $select = $('#SelectQueryVideo');
                $select.val(name);
                $select.trigger('change');
                handler(name, value);
            };
            var cityHandler = function(name, value) {
                if(self.isExistOption(name, value)){//若select中存在值为value的项，直接显示value项
                    handler(name, value);
                } else {
                    handler(name, 'empty');//若select中存在不值为value的项，则默认选择“无”
                }
                self.changeCity();//触发2级下拉列表的变化
            };
            var sexHandler = function(name, value) {
                var $select = $('#sex');
                if(self.isExistOption('sex', value)){//若select中存在值为value的项
                    $select.val(value);
                } else {
                    $select.val('unlimited');//若select中存在不值为value的项，则默认选择“不限”
                }
                $select.trigger('change');//触发自身name属性的变化
            };
            var handler = function(name, value) {
                if(value) {
                    self.find('[name="' + name + '"]').val(value);
                }
            };
            return {
                'city': {
                    name: 'city',
                    handler: cityHandler
                },
                'name': {
                    name: 'userName',
                    handler: idHandler
                },
                'uid': {
                    name: 'userId',
                    handler: idHandler
                },
                'nickname': {
                    name: 'nickname',
                    handler: idHandler
                },
                'sex': {
                    name: 'sex',
                    handler: sexHandler
                },
                'tel': {
                    name: 'telephone',
                    handler: handler
                },
                'post': {
                    name: 'postcode',
                    handler: handler
                }
            };
        },
        //判断select中是否存在值为value的项
        isExistOption: function(id, value) {
            var isExist = false;
            var $ele = $('#' + id);
            var count = $ele.find('option').length;
            for(var i = 0; i < count; i++) {
                if($ele.get(0).options[i].value == value){
                    isExist = true;
                    break;
                }
            }
            return isExist;
        },
        getCity: function(callback) {
            var self = this;
            callback = callback || this.renderCity;
            this.class.getCityData(function (data) {
                callback.call(self, data);
                self.logger.log('After getCity', 'data:', data);
            });
        },
        run: function() {
            this.getCity(this.renderCity);
            this.initValidator();
        }
    });
});