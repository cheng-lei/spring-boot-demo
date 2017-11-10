/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Legend.View.js
 * @author: yanghuan@qiyi.com
 */
define(
    [
        'legend/Legend'
    ],
    function(Legend) {
        Legend.View = Arm.create('View', {
            name: 'Legend.View',
            properties: {
                $dataContainer: null,       //存放表格的容器
                $templateContainer: null,  //表格模板
                color: [],                 //存放线条颜色的数组
                IsShow: true,             //是否显示了图例
                content: null,             //可以画图的对象
                IsPaint: false,            //是否已经画出了折线图
                drawing: null              //画布对象
            },
            options: {
                dataSelecter: '#dataArea',
                templateSelecter: '#TemplateRow',
            },
            init: function(options) {
                this.$dataContainer = $(this.options.dataSelecter);
                this.$templateContainer = $(this.options.templateSelecter);
                this.class = this.class || this.getClass({});
                this.logger = Logger.get(this);
            },

            events: {
                'click #BtnPaintLineChart': 'paintLineChart',  //注意：触发事件的按钮要在run的容器中 ！！1！！       
                'click #BtnHideLegend': 'hide',
                'click #BtnShowLegend': 'show',
                'click #BtnEditDistance': 'editDistance'
            },

            //显示Json中的数据
            showData: function (param) {
                self = this;
                var $tmpl = this.$templateContainer;
                var $dataLocation = this.$dataContainer;
                this.class.getAllData(param, function(data) {
                    // console.log(data);
                    self.render($dataLocation, $tmpl, data);
                    // var $row = $tmpl.tmpl(data);
                    // $dataLocation.append($row);
                });
                this.logger.log('showData', 'Arguments:', arguments);
            },

            //画折线图
            paintLineChart: function (evt, ele) {
                this.IsPaint = true;
                $('#canvasChart').paintLineChart({records:this.class.getData()});
                this.d3Paint();
            },           //注意：函数后面的逗号总是会忘记！！！！！！！！！！！
           
            //使用d3JS画折线图
            d3Paint: function() {
                var record = this.class.getD3FormatData();

                $('#ChartContainer').linechart({
                    titles: record.titles,
                    data: record.data
                });
            },
           
            //隐藏图例
            hide: function(){
                if (this.IsPaint === false) {
                    this.tipContent('请先画折线图');
                } else if (this.IsShow === false) {
                    this.tipContent('图例已隐藏，不用再次隐藏');
                } else {
                    $('#canvasChart').paintLineChart('hideLegend');
                    this.IsShow = false;
                }
            },

            //显示图例
            show: function(){
                if (this.IsPaint === false) {
                    this.tipContent('请先画折线图');
                } else if (this.IsShow === true) {
                    this.tipContent('图例已显示，不用再次显示');
                } else {
                    $('#canvasChart').paintLineChart('paintLegend');
                    this.IsShow = true;
                }
            },

            //更改纵坐标间距
            editDistance: function(){
                if (this.IsPaint === false) {
                    this.tipContent('请先画折线图');
                } else {
                    // var re = /^\d{2}$/;
                    var re = /^\+?[1-9][0-9]*$/;
                    // var newDistance = document.getElementById('distance').value;
                    var newDistance = $('#distance').val();
                    if (!re.test(newDistance)){
                        this.tipContent('只能输入正整数');
                    } else {
                        var newColInterval = parseInt(newDistance, 10);
                        $('#canvasChart').paintLineChart('changeInterval', newColInterval, 'col');
                    }
                }
            },

            tipContent: function(param) {
                $.tip({
                        theme: 'error',
                        content: param
                    });
            },

            run: function() {
                this.showData({});
                $('#canvasChart').paintLineChart();
            }
        });
    }
);