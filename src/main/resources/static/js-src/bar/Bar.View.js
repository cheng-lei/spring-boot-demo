/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Module.View.js
 * @path:   js-src/module/
 * @desc:   Module模块下基础DOM操作类
 * @author: liuliguo@qiyi.com
 * @date:   2017-1-10
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'bar/Bar'
    ],
    function(Bar) {
        Bar.View = Arm.create('View', {
            name: 'Bar.View',
            properties: {
				tableContainer: null,
				template: null,
				mainClass: null
            },
            options: {
				tableContainer: null,
				template: null
            },
            init: function(options) {
				this.tableContainer = this.options.tableContainer;
				this.template = this.options.template;
				this.mainClass = this.getClass();
            },
            events: {
                'mousemove #canvasContainer': 'addEvent'
            },
            bindEvent: function() {

            },
            /**
             *对canvas添加mousemove事件，并检测鼠标是否在每个bar内
             */
            addEvent: function(evt) {
				var left = 0, top = 0;
				if($("#barCanvas").position()){
					left = $("#barCanvas").position().left;
					top = $("#barCanvas").position().top;
				}
				
				$('#canvasContainer').barChart('detectPosition', evt.pageX-left, evt.pageY-top);
            },
            /**
             * 显示读取的数据
             * @param {Object} paramars
             */
            showData: function(paramars) {
				var self = this;
				this.mainClass.readData(paramars, function(data) {
					self.render(self.tableContainer, self.template, data.record);
					self.showBars(data, 1140, 450);
					self.showLegend(data.record);
//					console.log("showData");
//					self.addEvent();
				});
            },
            /**
             * 显示柱状图
             * @param {Object} data 显示的数据对象
             * @param {Object} width 绘制的canvas 的宽度
             * @param {Object} height 绘制的canvas 的高度
             */
            showBars: function(data, width, height) {
				$('#canvasContainer').barChart({
					data: data,
					canvasWidth: width,
					canvasHeight: height
				});
            },
            /**
             * 显示折线图
             * @param {Object} data 显示的数据
             */
            showLegend: function(data) {
				$('#canvasChart').paintLineChart({records: data});
				$('#canvasChart').paintLineChart('changeInterval', 40, 'col');
            },
            run: function() {
                // this.render();
                this.showData();
            }
        });
    }
);