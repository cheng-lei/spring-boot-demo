

qui.qwidget("qui.paintLineChart", {
    //绘制坐标；这里的函数里面可以直接访问调用它的函数里定义的变量，所以context可以直接使用
    options: {
        records: [],
        rowInterval: 1,  //横坐标的数字宽度
        colInterval: 50,  //纵坐标的数字宽度
        canvasWidth: 1140,  //画布的宽度
        canvasHeight: 450   //画布的高度
    },

    privateOptions: {
        IsFirstEnter: true,
        IsShowLegend: true,
        titles: [],
        IsChange: false,
        rowData: [],   //横坐标实际的数据，二维数组
        colData: [],   //纵坐标实际的数据，二维数组
        color: [],

        drawing: null,
        // context: null
        colWidth: 0,        //纵坐标的实际间隔
        colStartNum: 0,     //纵坐标的开始数字
        colMaxLen: 350,     //纵坐标的最大长度
        colNum: 0,          //纵坐标要分成的间隔数量
        colMaxNum: 10,      //纵坐标的最大间隔数量
        MaxY: 0,
        MinY: 0,

        rowWidth: 0,        //横坐标的实际间隔
        rowStartNum: 0,     //横坐标的开始数字
        rowMaxLen: 0,       //横坐标的最大长度
        rowNum: 0,          //横坐标要分成的间隔数量
        rowMaxNum: 10       //横坐标的最大间隔数量

    },

    _init: function() {
        this.privateOptions.rowMaxLen = this.options.canvasWidth * 0.8;
        this.privateOptions.colMaxLen = this.options.canvasHeight * 0.8;
        this.privateOptions.IsChange = false;
        this.render();
    },

    render: function() {
        if (this.privateOptions.IsFirstEnter === true) {
            this.renderDefault();
            this.privateOptions.IsFirstEnter = false;
        } else {
            this.renderData();
        }
    },
    
    renderDefault: function() {
        this.createCanvas();
        this.createDrawing();

        context.beginPath();
        context.font = '20px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#c0c0c0';
        context.fillText('还未画折线图......', 500, 200);
        context.closePath();
        context.fillStyle = '#000000';
    },

    createCanvas: function() {
        var canvas = $('<canvas id = "myCanvas" width = ' + this.options.canvasWidth +' height = ' + this.options.canvasHeight +'></canvas>');
        //获得调用该Widget的DOM元素的ID
        var callerId = this.element.attr('id');
        //插入画布到DOM中
        $('#' + callerId).append(canvas);
        // console.log($('#canvasChart #myCanvas').attr('height'));
    },
    
    createDrawing: function() {
        // var drawing = $('#myCanvas'); //这里不能使用这种写法
        var drawing = document.getElementById('myCanvas');
        this.drawing = drawing;
        this.privateOptions.drawing = drawing;
        if(drawing.getContext){
            context = drawing.getContext('2d');
            // this.context = context;
        }
    },

    renderData: function() {
        this.clearCanvas();
        this.setCircleCenter();
        this.dealData();
        this.getRandomColor();
        this.paintCoord();
        this.paintLineChart();
        context.restore();
        if(this.privateOptions.IsShowLegend === true) {
            this.paintLegend();
        }
    },

    clearCanvas: function() {
        context.clearRect(0, 0, $(this.drawing).width(), $(this.drawing).height());
    },

    paintCoord: function() {
        context.beginPath();
        context.font = 'bold 14px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        // context.lineWidth = '1'; 

        this.paintX();
        this.paintY();

        context.strokeStyle = '#c0c0c0';
        context.lineWidth = 1;  //线条宽度
        context.stroke();  //不加这一行不能画出图来
        context.closePath();

    },

    //画横格
    paintX: function() {
        var textNum = this.privateOptions.colStartNum;
        for(var row = 0, i = 0; i < this.privateOptions.colNum; row = row - this.privateOptions.colWidth, i ++){
            context.moveTo(0, row);
            context.lineTo(this.privateOptions.rowMaxLen, row);
            context.fillText(textNum, -20, row);
            textNum = textNum + this.options.colInterval;
        }
    },

    //画竖格  
    paintY: function() {
        var textNum = this.privateOptions.rowStartNum;
        for(var col = 0, i = 0; i < this.privateOptions.rowNum; col = col + this.privateOptions.rowWidth, i ++){
            context.moveTo(col, 0);
            context.lineTo(col, -this.privateOptions.colMaxLen);
            context.fillText(textNum, col, 20);
            textNum = textNum + this.options.rowInterval;
        }
    },

    //处理数据
    dealData: function() {
        this.privateOptions.color = [];
        this.privateOptions.colData = [];
        this.privateOptions.rowData = [];
        this.privateOptions.titles = [];

        var record = this.options.records;

        var MinX = record[0].data[0].x;
        var MaxX = record[0].data[0].x;
        var MinY = record[0].data[0].y;
        var MaxY = record[0].data[0].y;
        
        //分别得到横纵坐标的最大、最小值，并将横、纵坐标的数据分开存放
        var xx = [];
        var yy = [];
        for (var i = 0; i < record.length; i++) {
            this.privateOptions.titles.push(record[i].title);
            for (var j = 0; j < record[i].data.length; j++) {
                xx.push(record[i].data[j].x);
                yy.push(record[i].data[j].y);

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
            this.privateOptions.rowData.push(xx);
            this.privateOptions.colData.push(yy);
            xx = [];
            yy = [];
        }
      
        //获得画坐标的参数
        this.privateOptions.rowStartNum = Math.floor(MinX);
        if ((MaxX - MinX) > this.privateOptions.rowMaxNum && !this.privateOptions.IsChange) {
            this.options.rowInterval = Math.ceil((MaxX - MinX) / this.privateOptions.rowMaxNum);
        }
        this.privateOptions.rowNum = Math.ceil((MaxX - MinX) / this.options.rowInterval) + 1;
        this.privateOptions.rowWidth = this.privateOptions.rowMaxLen / this.privateOptions.rowNum;

        this.privateOptions.colStartNum = Math.floor(MinY);
        if ((MaxY - MinY) > this.privateOptions.colMaxNum  && !this.privateOptions.IsChange) {
            this.options.colInterval = Math.ceil((MaxY - MinY) / this.privateOptions.colMaxNum);
        }
        this.privateOptions.colNum = Math.ceil((MaxY - MinY) / this.options.colInterval) + 1;
        this.privateOptions.colWidth = this.privateOptions.colMaxLen / this.privateOptions.colNum;
    },

    paintLineChart: function() {
        var xx, yy;
        for (var i = 0; i < this.options.records.length; i++) {
            context.beginPath();
            context.strokeStyle = this.privateOptions.color[i];

            context.lineWidth = 2;      //线条宽度
            xx = ((this.privateOptions.rowData[i][0] - this.privateOptions.rowStartNum) / this.options.rowInterval) * this.privateOptions.rowWidth;
            yy = ((this.privateOptions.colData[i][0] - this.privateOptions.colStartNum) / this.options.colInterval)  * this.privateOptions.colWidth;
            context.moveTo(xx, -yy);
            for (var j = 1; j < this.privateOptions.rowData[i].length; j ++) {
                xx = ((this.privateOptions.rowData[i][j] - this.privateOptions.rowStartNum) / this.options.rowInterval) * this.privateOptions.rowWidth;
                yy = ((this.privateOptions.colData[i][j] - this.privateOptions.colStartNum) / this.options.colInterval) * this.privateOptions.colWidth;
                context.lineTo(xx, -yy);
            }
            context.stroke();
            context.closePath();
        }
    },

    //画图例
    paintLegend: function() {
        context.lineWidth = 2;  //线条宽度 
        this.setCircleCenter();
        var rowTemp = this.privateOptions.rowMaxLen + 50;
        var colTemp = this.privateOptions.colMaxLen;
        for (var i = 0; i < this.privateOptions.color.length; i++) {
            context.beginPath();
            context.strokeStyle = this.privateOptions.color[i];
            context.moveTo(rowTemp, -colTemp);
            context.lineTo(rowTemp + 40, -colTemp);
            context.fillText(this.privateOptions.titles[i], rowTemp + 70, -colTemp);
            colTemp = colTemp - 40;
            context.stroke();  //不加这一行不能画出图来    
            context.closePath();
        }
        context.restore();
        this.privateOptions.IsShowLegend = true;
    },

    hideLegend: function() {
        context.clearRect(this.privateOptions.rowMaxLen + $(this.drawing).width() * 0.05, 0, this.privateOptions.rowMaxLen + 300, this.privateOptions.colMaxLen * 2);
        this.privateOptions.IsShowLegend = false;
    },

    changeInterval: function(newInterval, which) {
        if (which === 'row') {
            this.options.rowInterval = newInterval;
        } else {
            this.options.colInterval = newInterval;
        }
        this.privateOptions.IsChange = true;
        this.renderData();
    },

    //更改圆心位置  
    setCircleCenter: function() {
        context.save();
        context.translate($(this.drawing).width() * 0.05, $(this.drawing).height() * 0.9);
    },
    
    //取得随机颜色
    getRandomColor: function() {
        // this.privateOptions.color = [];
        var c;
        for(var j = 0; j < this.options.records.length; j++){
            c = '#'+('00000'+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            this.privateOptions.color.push(c);
        }
    }
});


