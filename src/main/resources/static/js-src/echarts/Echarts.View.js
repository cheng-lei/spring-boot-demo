/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Echarts
 * author: jingtang@qiyi.com
 * date: 2016-7-13
 */
define(
    [
        'echarts/Echarts'
    ],
    function(Echarts) {
        Echarts.View = Arm.create('View', {
            name: 'Echarts.View',
            properties: {

                class: null,
                $table: null,
                tableParam: null
            },
            options: {
                tableSelector: '#PriceGrid',
                echartsContainer: '#canvasChart'
            },
            init: function(options) {
                this.$table = this.options.$table || this.find(this.options.tableSelector);
                this.$eContainer = this.options.$eContainer || this.find(this.options.echartsContainer);
                this.class = this.class || this.getClass({});
                this.logger = Logger.get(this);
                this.build();
            },

            build: function() {

                this.initGrid();
            },
            //初始化表格
            initGrid: function(options) {
                var self = this;
                var tableConfig = this.getConfig('Echarts.Config').TABLE_GRID;
                options = $.extend(true, {
                    datatype: "JSON",
                    mtype: "GET",
                    multiselect: true,
                    rowNum: 3,
                    sortable: true,
                    sortname: 'id',
                    sortorder: 'asc',
                    multiselectWidth: 30
                }, tableConfig, options);
                self.$table.grid(options);
            },
            //绑定绘制图表事件
            events: {
                'click #BtnPaintLineChart': 'paintLineChart'
            },
            //获取表格勾选的ID
            getSelectedID: function() {
                var self = this;
                var selectedIds = [];
                selectedIds = self.$table.grid("getGridParam", "selarrrow");
                if (selectedIds.length < 1) {
                    $.tip({
                        theme: 'error',
                        content: '请至少选择1条要绘制的项'
                    });
                    return;
                }
                return selectedIds;

            },
            //获取从表格中勾选的数据
            getSelectedData: function() {
                var record = {};
                var self = this;
                var selectedIds = this.getSelectedID();
                var selectData = [];
                var legendArr = [];
                //根据每个勾选的id,获取该行数据
                for (var i = 0; i < selectedIds.length; i++) {
                    var sData = [];
                    sData = self.$table.grid('getRowData', selectedIds[i]);
                    var paintData = self.class.getData(sData);
                    legendArr.push(sData["std"]);
                    selectData.push(paintData);
                }

                record.selectData = selectData;
                record.legendArr = legendArr;
                return record;

            },

            //根据选取的数据绘制折线图
            paintLineChart: function() {

                var record = this.getSelectedData();
                var selectedIds = this.getSelectedID();
                var chartSeris = [];
                var itemConfig = this.getConfig('Echarts.Config').ITEM_OPT;
                //每选取一行，添加一组数据
                for (var j = 0; j < record.selectData.length; j++) {

                    var item = $.extend(true, {
                        name: record.legendArr[j],
                        data: record.selectData[j]

                    }, itemConfig);
                    chartSeris.push(item);
                }
                var optConfig = this.getConfig('Echarts.Config').ECHART_OPT;
                var options = $.extend(true, {
                    legend: {
                        data: record.legendArr
                    },
                    series: chartSeris

                }, optConfig);

                $("#canvasChart").echart(options);


            },

            bindEvent: function() {

            },

            run: function() {


            }

        });
    }
);
