/*
 * Copyright 2016 Qiyi.com All rights reserved.
 * file: jquery.qui.simpleSlider.js
 * author: yuboran
 * date: 2016-6-21
 */
qui.qwidget("qui.simpleSlider",{
    version: "0.0.1",

    options: {
        sliderBoxWidth:400,
        sliderBoxHeight:200,
        sliderStart:null,
        sliderMove:null,
        sliderStop:null
    },

    privateOptions: {
        tmpl: '<div class="sliderBox">' +
        '<input class="ableBtn" type="checkbox" name="able" checked="checked"/>' +
        '<div class="rangeSlider">' +
        '<a class="slider" href="javascript:void(0);"></a>' +
        '<span class="sliderColor"></span>' +
        '</div>' +
        '</div>',
        oAbleBtnLeft: 30,
        oRangeSliderLeft:80,
        oRangeSliderWidth:280
    },

    //生成HTML，绑定事件
    _create: function(){
        this.element.append($(this.privateOptions.tmpl));
        this.$oSliderBox= this.element.find('.sliderBox');
        this.$oSliderBox.css({"width":this.options.sliderBoxWidth,"height":this.options.sliderBoxHeight});
        this.$oAbleBtn=this.element.find('.ableBtn');
        this.$oRangeSlider=this.element.find('.rangeSlider');
        if(this.options.sliderBoxWidth>200){
            this.$oAbleBtn.css("left",this.options.sliderBoxWidth*0.075);
            this.$oRangeSlider.css({"width":this.options.sliderBoxWidth*0.7,"left":this.options.sliderBoxWidth*0.2});
        }else{
            this.$oAbleBtn.css("left",200*0.075);
            this.$oRangeSlider.css({"left":200*0.2,"width":200*0.7});
        }
        if(this.options.sliderBoxHeight>80){
            this.$oAbleBtn.css("top",(this.options.sliderBoxHeight/2)-14);
            this.$oRangeSlider.css("top",(this.options.sliderBoxHeight/2)-5);
        }else{
            this.$oAbleBtn.css("top",(80/2)-14);
            this.$oRangeSlider.css("top",(80/2)-5);
        }
        this.$oSlider=this.element.find('.slider');
        this.$oSliderColor=this.element.find('.sliderColor');
        if(this.options.sliderBoxWidth>200){
            this.privateOptions.oRangeSliderLeft=this.options.sliderBoxWidth*0.2;
            this.privateOptions.oAbleBtnLeft=this.options.sliderBoxWidth*0.075;
            this.privateOptions.oRangeSliderWidth=this.options.sliderBoxWidth*0.7;
        }else{
            this.privateOptions.oRangeSliderLeft=200*0.2;
            this.privateOptions.oAbleBtnLeft=200*0.075;
            this.privateOptions.oRangeSliderWidth=200*0.7;
        }
    },

    _init: function(){
        this.dragSlider();
        this.disableSlider();
    },

    getCurrentValue: function(){
        var self=this;
        return parseInt(self.$oSlider.css("left"),10);
    },

    sliding: function(t){
        var self=this;
        var value=t+"px";
        self.$oSlider.css("left",value);
    },

    disableSlider: function(){
        var self=this;
        self.$oAbleBtn.bind("click",function(){
            if(self.$oAbleBtn.is(":checked")){
                self.disables(1);
            }else{
                self.disables(0);
            }
        });
    },

    disables: function(sign){
        var self=this;
        if(sign){
            self.dragSlider();
            self.$oSlider.css("background-color","#FBFBFB");
            self.$oSliderColor.css("display","block");
        }else{
            self.$oSlider.unbind("mousedown");
            self.$oSliderBox.unbind("mousemove");
            self.$oSlider.css("background-color","#DDDDDD");
            self.$oSliderColor.css("display","none");
        }
    },

    dragSlider: function(){
        var self=this;
        var flagDown;
        this.$oSlider.bind("mousedown",function(e){
            flagDown=true;
            var startX= e.screenX;
            if(self.options.sliderStart!=null){
                self.options.sliderStart();
            }
            self.$oSliderBox.bind("mousemove",function(e){
                self.outputPercentage();
                if(self.options.sliderMove!=null){
                    self.options.sliderMove();
                }
                var startPosition=self.getCurrentValue();
                var currentX= e.screenX;
                var distance=currentX-startX;
                var targetPosition=startPosition+distance;
                if(targetPosition<0){
                    targetPosition=0;
                }else if(targetPosition>(self.privateOptions.oRangeSliderWidth-20)){
                    targetPosition=self.privateOptions.oRangeSliderWidth-20;
                }
                self.sliding(targetPosition);
                startX=currentX;
                self.paintColor();
            });
        });
        $(document).bind("mouseup",function(){
            if(flagDown===true){
                if(self.options.sliderStop!=null){
                    self.options.sliderStop();
                }
                self.$oSliderBox.unbind("mousemove");
            }
            flagDown=false;
        });
    },

    paintColor: function(){
        var tarWidth=this.getCurrentValue()+"px";
        this.$oSliderColor.css("width",tarWidth);
    },

    outputPercentage: function(){
        var self=this;
        var curValue=self.getCurrentValue();
        var percentage=((curValue/(self.privateOptions.oRangeSliderWidth-20))*100).toFixed(0);
        return percentage;
    }

});
