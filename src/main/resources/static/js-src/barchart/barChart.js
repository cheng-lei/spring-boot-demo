/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   barChart.js
 * @path:   js-src/barchart/
 * @desc:   显示柱状图
 * @author: liuliguo@qiyi.com
 * @date:   2017-1-10
 */
qui.qwidget("qui.barChart", {
	options: {
		data: [],          //显示的原始数据
		canvasHeight: null, //canvas的高度
		canvasWidth: null   //canvas的宽度
	},
	
	privateOptions: {
		context: null,//canvas 绘制对象
		bbox: {},     //存储X轴和Y轴的最大最小值
		xOffset: 50,  //坐标轴距离左边的偏移量
		yOffset: 20,  //坐标轴距离上边的偏移量
		barStyle: {   //bar显示的样式对象
			colors: []
		},
		rectObjects: [], //存储context绘制的所有bar
		currentObjectIndex: -1,//鼠标选中bar的索引值，-1表示为选中
		bIsInBar: false,        //鼠标是否在bar内的状态
		data: null,
		canvasWidth: null,
		canvasHeight: null,
		tipColor: null
	},

	_init: function() {
		this.privateOptions.data = this.options.data;
		this.privateOptions.canvasWidth = this.options.canvasWidth;
		this.privateOptions.canvasHeight = this.options.canvasHeight;
		this.privateOptions.tipColor = this.options.color||"red";
		this.randonColor();
		this.dealData();
		this.createCanvas();
		this.drawCanvas();
		this.drawLegend();
	},
	/**
	 * 随机产生颜色值
	 */
	randonColor: function() {
		var c;
        for(var j = 0; j < this.privateOptions.data.record.length; j++) {
            c = '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
            this.privateOptions.barStyle.colors.push(c);
        }
	},
	
	/**
	 * 处理读取的数据，找出最大最小值
	 */
	dealData: function() {
        var record = this.privateOptions.data.record;

        var MinX = record[0].data[0].x;
        var MaxX = record[0].data[0].x;
        var MinY = record[0].data[0].y;
        var MaxY = record[0].data[0].y;
        
        for (var i = 0; i < record.length; i++) {
            for (var j = 0; j < record[i].data.length; j++) {
                if (MinX > record[i].data[j].x) {
                    MinX = record[i].data[j].x;
                }
                if (MaxX < record[i].data[j].x) {
                    MaxX = record[i].data[j].x;
                }
                if (MinY > record[i].data[j].y) {
                    MinY = record[i].data[j].y;
                }
                if (MaxY < record[i].data[j].y) {
                    MaxY = record[i].data[j].y;
                }
            }
        }
        this.privateOptions.bbox = {
			MinX: MinX,
			MaxX: MaxX,
			MinY: MinY,
			MaxY: MaxY
        };
    },
    /**
     * 创建canvas画布，并添加到显示节点下。
     */
    createCanvas: function() {
		var $canvas = $('<canvas id="barCanvas"></canvas>');

		$canvas[0].width = parseInt(this.privateOptions.canvasWidth, 10);
		$canvas[0].height = parseInt(this.privateOptions.canvasHeight, 10);

		var context = $canvas[0].getContext('2d');
		this.privateOptions.context = context;
		
		this.getParentJObject().append($canvas);
    },
    /**
     * 获取canvas节点要添加的如节点对象
     * return <Object> jQuery对象
     */
    getParentJObject: function() {
		var callerId = this.element.attr('id');
		return $('#' + callerId);
    },
    /**
     * 进行canvas绘制
     * 
     */
    drawCanvas: function() {
		this.clearCanvas();
		this.drawCoordinate();
		this.drawBars();
    },
    /**
     * 绘制显示坐标系
     */
    drawCoordinate: function() {
		var xOffset = this.privateOptions.xOffset,yOffset = this.privateOptions.yOffset;
		var width = this.privateOptions.canvasWidth;
		var height = this.privateOptions.canvasHeight;
		var originPoint = [xOffset, height-yOffset];
		var yEndPoint = [xOffset, yOffset];
		var xEndPoint = [width-xOffset*2, height-yOffset];
		//绘制Y轴
		this.drawLine(originPoint, yEndPoint);
		//绘制X轴 
		this.drawLine(originPoint, xEndPoint);
		this.drawText(originPoint, yEndPoint, xEndPoint);
    },
    /**
     * 绘制一条两个点的直线
     * @param {Object} stratPoint 直线起始点
     * @param {Object} endPoint 直线结束点
     * @param {Object} style 直线显示样式，包括color，width
     */
    drawLine: function(stratPoint, endPoint, style) {
		if (!style) {
			style = {};
		}
		var context = this.privateOptions.context;
		//设置样式
		context.strokeStyle = style.color || "#0000ff";
		context.lineWidth = style.width || 2;
		//绘制路径
		context.beginPath();
		context.moveTo(stratPoint[0], stratPoint[1]);
		context.lineTo(endPoint[0], endPoint[1]);
		//开始绘制
		context.stroke();
    },
    /**
     * 绘制坐标轴的显示文本
     * @param {Object} startPoint 坐标轴原点坐标
     * @param {Object} yendPoint Y轴终点坐标
     * @param {Object} xendPoint X轴终点坐标
     */
    drawText: function(startPoint, yendPoint, xendPoint) {
		var xOffset = this.privateOptions.xOffset-40, countY = 10;
		var minY = this.privateOptions.bbox.MinY;
		var maxY = this.privateOptions.bbox.MaxY;
		var minX = this.privateOptions.bbox.MinX;
		var maxX = this.privateOptions.bbox.MaxX;
		
		var countX = this.privateOptions.data.record[0].data.length;
		var context = this.privateOptions.context;
		var spanPixelY = (startPoint[1]-yendPoint[1]) / (countY+2);
		var spanPixelX = Math.round((xendPoint[0] - startPoint[0])/countX);

		var spanNumY = (maxY-minY) / countY;
		var styleY = {
			color:'#EEE0E5'
		};
		//获取Y轴最小值
		if (!this.baseNum) {
			this.baseNum = {
				baseNumY: minY-spanNumY,
				spanNumY: spanNumY,
				spanPiexlY: spanPixelY,
				baseNumX: minX,
				spanPixelX: spanPixelX,
				spanNumX: 1
			};
		}
		
		context.font="12px Verdana";
		context.fillText(minY-spanNumY, xOffset, startPoint[1]);
		//划横线
		for (var i=1; i <= countY+1; i++) {
			context.fillText(minY + (i - 1) * spanNumY, xOffset, startPoint[1] - (i) * spanPixelY);
			this.drawLine([startPoint[0] + 2,startPoint[1] - (i) * spanPixelY], [xendPoint[0], startPoint[1]-(i)*spanPixelY], styleY);
		}
		//划竖线
		for(var j=0; j < countX; j++) {
			context.fillText(minX+j, startPoint[0] + (j + 0.5) * spanPixelX, startPoint[1] + 15);
			this.drawLine([startPoint[0] + (j + 1) * spanPixelX, startPoint[1]], [startPoint[0] + (j + 1) * spanPixelX, startPoint[1] + 4]);
			this.drawLine([startPoint[0] + (j + 1) * spanPixelX, startPoint[1] - 2], [startPoint[0] + (j + 1) * spanPixelX, yendPoint[1]], styleY);
		}
    },
    /**
     * 绘制所有的bar矩形
     */
    drawBars: function() {
		var record = this.privateOptions.data.record;
		var colors = this.privateOptions.barStyle.colors;
		var barWidth = this.baseNum.spanPixelX / 4;
		//绘制bar
		for(var h=0, timeNum = this.privateOptions.data.record[0].data.length; h<timeNum; h++) {
			var leftPosition = h * this.baseNum.spanPixelX;
			for(var k=0, recordNum = record.length; k < recordNum; k++) {
				this.drawBar(leftPosition+(k+0.5) * barWidth, barWidth - 5, record[k].data[h].y, colors[k]);
			}
		}
    },
    /**
     * 绘制每个bar矩形
     * @param {Object} left bar距离canvas左边的距离，单位为像素
     * @param {Object} width bar的宽度，单位为像素
     * @param {Object} realNum bar代表的实际数值
     * @param {Object} color bar填充的颜色
     */
    drawBar: function(left, width, realNum, color) {
		var height = this.calculateBarHeight(realNum);
		var topPosition = parseInt(this.privateOptions.canvasHeight - height - this.privateOptions.yOffset, 10);
		var leftPosition = parseInt(this.privateOptions.xOffset + left, 10), barWidth = parseInt(width, 10);
		var context = this.privateOptions.context;
		var rectObj = {};
		
		rectObj.topLeftPoint = [leftPosition, topPosition - 1];
		rectObj.width = barWidth;
		rectObj.height = height;
		rectObj.color = color || "green";
		rectObj.realNum= realNum;
		this.privateOptions.rectObjects.push(rectObj);

		context.beginPath();
		//topPosition-1绘制位置上移一个像素，防止压盖X轴；
		context.rect(leftPosition, topPosition-1, barWidth, height);
		context.fillStyle = color || "green";
		context.fill();
    },
    /**
     * 计算每个bar的高度
     * @param {Object} realNum 每个bar代表的实际值
     */
    calculateBarHeight: function(realNum) {
		var countY = ((realNum - this.baseNum.baseNumY) / this.baseNum.spanNumY).toFixed(2);
		var realPiexlHeight = this.baseNum.spanPiexlY * countY;
		return parseInt(realPiexlHeight, 10);
    },
    /**
     * 清除整个画布
     */
    clearCanvas: function() {
		this.privateOptions.context.clearRect(0, 0, this.privateOptions.canvasWidth, this.privateOptions.canvasHeight);
    },
    /**
     * 显示图例
     */
    drawLegend: function() {
		var context = this.privateOptions.context;
		var records = this.privateOptions.data.record;
		var colors = this.privateOptions.barStyle.colors;
		
		context.save();
		context.translate(this.privateOptions.canvasWidth-2*this.privateOptions.xOffset, 0);
		context.font = "20px Arial";

		for(var i=0, num=records.length; i<num; i++) {
			context.beginPath();
			context.rect(10, 20 + (i * 30), 50, 20);
			context.fillStyle = colors[i];
			context.fill();

			context.save();
			context.fillStyle = "black";
			context.fillText(records[i].title, 60, 20+ (i * 30) + 18);
			context.restore();
		}
		context.restore();
    },
    /**
     * 清除图例
     */
    clearLegend: function() {
		var context = this.privateOptions.context, num = this.privateOptions.data.record.length;
		context.save();
		context.translate(this.privateOptions.canvasWidth-2*this.privateOptions.xOffset, 0);
		context.clearRect(0, 0, 100, 20 + num * 30);
		context.restore();
    },
    /**
     * 绘制矩形
     * param context <Object> canvas 绘图对象
     * param minPoint <Array> 存储的矩形的最上角最小像素坐标
     * param width <Number> 绘制的矩形宽度，单位为像素
     * param height <Number> 绘制的矩形高度，单位为像素
     * param color <String> 矩形填充的颜色
     */
    drawRect: function(context, minPoint, width, height, color, realNum) {
		if (color) {
			context.save();
			context.beginPath();
			context.fillStyle=color;
			context.rect(minPoint[0], minPoint[1], width, height);
			context.fill();
			context.restore();
		} else {
			context.save();
			context.beginPath();
			context.fillStyle=this.privateOptions.tipColor;
			context.rect(minPoint[0], minPoint[1], width, height);
			context.fill();
			context.restore();

			if (realNum) {
				context.save();
				context.fillStyle = "black";
				context.font = "20px Georgia";
				context.fillText(realNum, minPoint[0], minPoint[1]+14, width);
				context.restore();
			}
		}
    },
    /**
     * 清除指定范围内的图形
     * param context <Object> canvas 绘图对象
     * param minPoint <Array> 存储的矩形的最上角最小像素坐标
     * param width <Number> 绘制的矩形宽度，单位为像素
     * param height <Number> 绘制的矩形高度，单位为像素
     */
    clearRect: function(context, minPoint, width, height) {
		context.clearRect(minPoint[0], minPoint[1], width, height);
    },
    /**
     * 检测x，y坐标是否在bar内，如果在则填充红色高亮显示。
     * param <Number> x 鼠标x轴坐标
     * param <Number> y 鼠标Y轴坐标
     */
    detectPosition: function(x,y) {
		var objArray = this.privateOptions.rectObjects;
		var context = this.privateOptions.context,index;

		for(var i=0, j = objArray.length; i < j; i++) {
			var minPoint = objArray[i].topLeftPoint;
			var maxPoint = [minPoint[0] + objArray[i].width, minPoint[1] + objArray[i].height];
			if (x > minPoint[0] && x < maxPoint[0] && y > minPoint[1] && y < maxPoint[1]) {//在bar内
				this.privateOptions.bIsInBar = true;
				index = this.privateOptions.currentObjectIndex;
				if(index!=-1 && index!=i){
					this.drawRect(context, objArray[index].topLeftPoint, objArray[index].width,
                                  objArray[index].height, objArray[index].color);
				}
				this.privateOptions.currentObjectIndex = i;
				this.drawRect(context, minPoint, objArray[i].width, objArray[i].height,
                              null, objArray[i].realNum);
				return;
			}
		}

		if (this.privateOptions.bIsInBar) {
			this.privateOptions.bIsInBar = false;
			index = this.privateOptions.currentObjectIndex;
			if (this.privateOptions.currentObjectIndex != -1) {
				this.drawRect(context, objArray[index].topLeftPoint, objArray[index].width,
                              objArray[index].height, objArray[index].color);
				this.privateOptions.currentObjectIndex = -1;
			}
		}
    }
});