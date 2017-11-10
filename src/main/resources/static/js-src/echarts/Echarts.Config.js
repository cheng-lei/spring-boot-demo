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
        Echarts.Config = Arm.create('Config', {
            name: 'Echarts.Config',

            TABLE_GRID: {
                url: 'data/echarts.json',
                colNames: ['ID', '基准', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                gridview: true,
                sortname: 'id',
                shrinkToFit: true,
                autowidth: true,
                jsonReader: {
                    root: 'data.result'
                },

                colModel: [{
                    name: 'id',
                    index: 'id',
                    title: false,
                    align: 'center',
                    width: 100
                }, {
                    name: 'std',
                    index: 'std',
                    title: false,
                    align: 'center',
                    width: 150
                }, {
                    name: 'jan',
                    index: 'jan',
                    title: false,
                    align: 'center',
                    width: 100
                }, {
                    name: 'feb',
                    index: 'feb',
                    title: false,
                    align: 'center',
                    width: 100
                }, {
                    name: 'mar',
                    index: 'mar',
                    title: false,
                    align: 'center',
                    width: 100
                }, {
                    name: 'apr',
                    index: 'apr',
                    title: false,
                    align: 'center',
                    width: 100
                }, {
                    name: 'may',
                    index: 'may',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'june',
                    index: 'june',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'july',
                    index: 'july',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'aug',
                    index: 'aug',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'sep',
                    index: 'sep',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'oct',
                    index: 'oct',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'nov',
                    index: 'nov',
                    sortable: false,
                    align: 'center',
                    width: 100

                }, {
                    name: 'dec',
                    index: 'dec',
                    sortable: false,
                    align: 'center',
                    width: 100

                }]
            },
            ECHART_OPT: {
                title: {
                    text: '2015年全年油价走势',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}美元/桶'
                    }
                }],
                series: []

            },

            ITEM_OPT: {
                // name : '',
                type: 'line',
                // data : 0.00,
                legendHoverLink: true, //??????????legend??hoverʱ??????Ӧ??????ʾ
                markPoint: { //?????ֵ??
                    data: [{
                        type: 'max',
                        name: '最大值'
                    }, {
                        type: 'min',
                        name: '最小值'
                    }]
                },
                markLine: { //ƽ???
                    data: [{
                        type: 'average',
                        name: '平均值'
                    }]
                }
            }



        });
    }
);
