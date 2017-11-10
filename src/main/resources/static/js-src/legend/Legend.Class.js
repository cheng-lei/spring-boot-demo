/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Legend.Class.js
 * @author: yanghuan@qiyi.com
 */
define(
    [
        'legend/Legend'
    ],
    function(Legend) {
        Legend.Class = Arm.create('Class', {
            name: 'Legend.Class',
            properties: {
                data: null,
                rowData: [],   //横坐标实际的数据，二维数组
                colData: [],   //纵坐标实际的数据，二维数组
                recordTitle: [],  //记录的名称，一维数组
            },
            options: {
            },

            //初始化横坐标长度，与表格长度相等，纵坐标是固定长度
            init: function(options) {
                var rowTemp = $('#tableArea').width();
                $('#myCanvas').attr('width', rowTemp);
                this.rowMaxLen =  rowTemp * 0.8;
            },
            
            //保存从Json中取到的数据
            saveData: function(response) {
                this.data = response.record;
                var xx = [], yy = [];
                if(response){
                    this.colInterval = response.colInterval;
                   
                    for (var i = 0; i < response.record.length; i++) {
                        this.recordTitle.push(response.record[i].title);
                        for (var j = 0; j < response.record[i].data.length; j++) {
                            xx.push(response.record[i].data[j].x);
                            yy.push(response.record[i].data[j].y);
                        }
                        this.rowData.push(xx);
                        this.colData.push(yy);
                        xx = [];
                        yy = [];
                    }
                }
            },

            getData: function() {
                return this.data;
            },
          
            getD3FormatData: function() {
                var record = {};
                var data = [];
                for (i = 0; i < this.rowData.length; i++) {
                    var tempData = [];
                    for (var j = 0; j < this.rowData[i].length; j++) {
                        var obj = {x: this.rowData[i][j],
                                   y: this.colData[i][j]};
                        tempData.push(obj);
                    }
                    data.push(tempData);
                }
                record.titles = this.recordTitle;
                record.data = data;
                return record;
            },

            //读取Json中的数据
            getAllData: function(data, callback) {
                var self = this;
                self.action.getDao().getData(data, {
                    success: function(back) {
                        if (back.record) {
                            self.saveData(back);
                            callback.call(self, back.record);
                        }
                    }
                });
            }
        });
    }
);