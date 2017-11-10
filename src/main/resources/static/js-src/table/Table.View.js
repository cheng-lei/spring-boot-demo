/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Table.View.js
 * @path:   js-src/table/
 * @desc:   Table模块下页面业对象类
 * @author: zhangxinxiu@qiyi.com
 * @date:   2015-1-9
 */

define(
    [
        'table/Table'
    ],
    function(Table) {
        Table.View = Arm.create('View', {
            name: 'Table.View',
            properties: {
                class: null,
                $form: null,
                $table: null,
                tableParam: null
            },

            options: {
                tableSelector: '#UserGrid',
                skillSelector: '.skill',
                queryFormSelector: '#QueryForm',
                modifyFormSelector: '#ModifyForm',
                modifyTemplateSelector: '#ModifyDataTemplate',
                pagerSelector: '#Pager'
            },

            init: function(options) {
                this.$form = this.options.$form || this.find(this.options.queryFormSelector);
                this.$table = this.options.$table || this.find(this.options.tableSelector);
                this.$modifyForm = this.find(this.options.modifyFormSelector);
                this.$pager = this.find(this.options.pagerSelector);
                this.class = this.class || this.getClass({});
                this.logger = Logger.get(this);

                // 初始化jqgrid表格，定义基本配置
                var tableConfig = this.getConfig('Table.Config').TABLE_GRID;
                this.tableParam = $.extend(true, {
                    datatype: "JSON",
                    mtype: "GET",
                    caption: "雇员表格",
                    multiselect: true,
                    rowNum: 5,
                    autowidth: true,
                    sortable: true,
                    sortname: 'id',
                    sortorder: 'asc',
                    multiselectWidth: 30,
                    pager: this.$pager
                }, tableConfig, options);

                this.bindEvent();
            },

            events: {
                'click #BtnRemove': 'removeItems',
                'click #BtnQuery': 'queryItems',
                'click .remove': 'removeItem',
                'click .modify': 'showModifyDialog',
                'click #BtnReLoad': 'reloadData',
                // 在行上自定义删除事件
                'removeRow #UserGrid tr': 'removeRow'

            },

            //自动提示
            bindEvent: function() {
                var self = this;
                var suggestParm = self.getConfig('Table.Config').SUGGEST;
                self.find(self.options.skillSelector).suggest({
                    source: suggestParm.localData,
                    valueKey: 'value'
                    // ,
                    // header: suggestParm.headerHTML,
                    // footer: suggestParm.footerHTML
                });
            },

            //删除选中的一项或多项
            removeItems: function() {
                var self = this;
                var selectedIds = self.$table.grid("getGridParam", "selarrrow");
                var len = selectedIds.length;
                if (len < 1) {
                    $.tip(
                        {
                            theme: 'error',
                            content: '请至少选择1条要删除的项!'
                        }
                    );
                    return;
                }

                if (confirm("您确定要删除这" + len + "项？")) {
                    // $.each(selectedIds, function() {
                    //     self.$table.grid("delRowData", this);
                    // });
                    while(len--) {
                        self.$table.grid("delRowData", selectedIds[0]);
                    }
                }
            },

            //删除一行数据
            removeRow: function(evt, row) {
                var self = this;
                var rowId = $(row).attr("id");
                $.confirm({
                    modal: 'true',
                    content: 'Are you sure to remove this item?',
                    callbacks: {
                        onOK: function() {
                            self.$table.grid("delRowData", rowId);
                        }
                    }
                });
            },

            removeItem: function(evt, ele) {
                var tr = $(ele).closest('tr')[0];
                // $(tr).trigger('removeRow');
                this.trigger('removeRow', tr);
                // 与上面$(tr).trigger相同
            },

            //查询
            queryItems: function() {
                var self = this;
                self.reload();
            },

            reload: function(param) {
                var self = this;
                Com.Grid.overridePostData(self.$table);
                param = param || $.extend({}, self.getParam(self.$form));
                self.tableParam.postData = param;
                self.logger.log('reload', 'Param:', param, 'TableParam:', self.tableParam);
                self.$table.grid('setGridParam', {
                    postData: param
                }).trigger('reloadGrid', [{
                    page: 1
                }]);
            },

            getParam: function($form) {
                var self = this;
                var param = self.getClass().getQueryParam($form);
                return param;
            },

            //修改一行数据
            showModifyDialog: function(evt, ele) {
                var self = this;
                var $tr = $(evt.target).closest('tr');
                var rowId = $tr.attr("id");
                var rowData = self.$table.grid("getRowData", rowId);

                if (self.$modifyForm.attr('data-lunched') != 'true') {
                    self.$modifyForm.html( $(self.options.modifyTemplateSelector).tmpl({ }) );
                    self.$modifyForm.attr('data-lunched', 'true');
                    self.$modifyForm.find(self.options.skillSelector).suggest({
                        source: self.getConfig('Table.Config').SUGGEST.localData,
                        valueKey: 'value'
                    });
                }
                var _saveData = function() {
                    var param = self.class.getPeopleParam(self.$modifyForm);
                    self.class.setPeople(param);
                    self.class.savePeople(function(data) {
                        self.setRowData($tr, param);
                    });
                };

                self.$modifyForm.dialog({
                    height: 350,
                    width: 600,
                    resizable: true,
                    modal: true,
                    buttons: {
                        "确定": function() {
                            _saveData();
                            $(this).dialog("close");
                        },
                        "取消": function() {
                            $(this).dialog("close");
                        }
                    }
                });
                self.setModifyParam(self.$modifyForm, rowData);
            },

            getURLParameters: function() {
                return this.class.getURLParameters();
            },

            //获取修改弹窗默认值
            setModifyParam: function($form, rowData) {
                var self = this;
                // 将sex文字处理为value，然后统一回填
                self.class.setPeople(rowData);
                self.class.processPeople();
                Formit.setFormValues($form, self.class.getPeople().toPlain(), {
                    skill: function($form, value, sourceData) {
                        self.action.getUtil().setTagValueString(this, $form, value, sourceData);
                    }
                });
            },

            //获取url信息并填写在input中
            setFormData: function(param, processor) {
                var self = this;
                processor = processor || {
                    skill: function($form, value, sourceData) {
                        self.action.getUtil().setTagValueString(this, $form, value, sourceData);
                    }
                };
                Formit.setFormValues(this.$form, param, processor);
            },

            setRowData: function($row, rowData) {
                var self = this;
                var data = new Arm.HashMap(rowData).format({
                    sex: function(value) {
                        return self.getUtil().getGenderTextByValue(value);
                    }
                });
                self.$table.grid( 'setRowData', $row.attr('id'),  data );
            },

            echo: function() {
                var self = this;
                if ( !($.isEmptyObject(Com.url.getParameters())) ) {
                    self.setFormData(self.getURLParameters());
                }
            },

            run: function() {
                var self = this;
                self.echo();
                self.tableParam.postData = self.getParam(self.$form);
                // 改为QUI wiget grid
                self.$table.grid(self.tableParam);
                // self.$table.jqGrid(self.tableParam);
            }
        });
    }
);