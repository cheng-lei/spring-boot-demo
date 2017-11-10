
qui.qwidget("qui.magnifier",{
    version: "1.0.0",

    options: {
        multiple: 3,
        responseWheel: true,
        magnifiedAreaWidth: 400,
        magnifiedAreaHeight: 400,
        reference: null,
        gap: 10
    },

    privateOptions: {
        magnifierTmpl:
        '<script type="text/x-jquery-tmpl">'+
            '<div class="qui-magnifier-magnifier {{= evtName}}"></div>'+
            '<div class="qui-magnifier-magnified-area {{= evtName}}">'+
                '<img class="qui-magnifier-magnified-img" src=""/>'+
                '<div class="qui-magnifier-coord">坐标：</div>'+
            '</div>'+
        '</script>'
    },

    _create: function() {
        if( $("body").css("position") == "static" ) {
            $("body").css("position","relative");
        }

        this.$container = $(this.privateOptions.magnifierTmpl).tmpl({
            evtName : this.eventNamespace.slice(1)
        });
        this.$container.appendTo("body");
    },

    _init: function() {
        if(this.options.multiple < 1){
            this.options.multiple = 1;
        }
        this.options.reference = this.options.reference? this.options.reference : this.element;

        this._initObjs();

        if(this._filterImg()) {
            this.$currentImg = this.$imgs.length == 1 ? this.$imgs : this.$imgs.eq(0) ;
            this._bindEvents();
        }
    },

    _initObjs: function() {
        //初始化各路对象
        this.$magnifier = this.$container.filter(".qui-magnifier-magnifier");
        this.$magnifiedArea = this.$container.filter(".qui-magnifier-magnified-area");

        this.$magnifiedImg = this.$container.find(".qui-magnifier-magnified-img");
        this.$mouseCoord = this.$container.find(".qui-magnifier-coord");

        this.isDisabled = false;
        this.showMagnifier = true;

        this.$currentImg = [0];
        this.$imgs = [];
        this.size = {};
    },

    _filterImg: function() {
        this.$imgs = this.element.is("img") ? this.element : this.element.find("img");
        return this.$imgs.length>0 ? true :false;
    },

    _bindEvents: function() {
        var self = this;
        var magnifierX, magnifierY, coordX, coordY;
        this._bindShowEvents();

        //放大图片加载事件
        this._on(this.$magnifiedImg, {
            load: function() {
                this._updateMagnifiedImgWH();
            }
        });

        //鼠标滚轮事件
        if(this.options.responseWheel) {
            if (document.attachEvent) {
                this.$magnifier[0].attachEvent("onmousewheel", function(evt) {   //IE 上120
                    self._changeMultiple( evt, -evt.wheelDelta/120 );
                });
            }else if (document.addEventListener) {
                this.$magnifier[0].addEventListener("DOMMouseScroll", function(evt) {  //ff 上-3
                    self._changeMultiple( evt, evt.detail/3 );
                }, false);
                this.$magnifier[0].addEventListener("mousewheel", function(evt) {   //其它 上120
                    self._changeMultiple( evt, -evt.wheelDelta/120 );
                }, false);
            }
        }
    },

    _bindShowEvents : function() {
        this._on(this.$imgs, {
            mouseenter: function(evt) {
                if(this.isDisabled === false){
                    this._initSize();
                    this._enterImg(evt);
                    this._bindImgMouseleave();
                }
            },
            mousemove: function(evt) {
                if(!this.$currentImg[0] || !this.$currentImg.is(":visible") || this.$currentImg.offset().left != this.$currentImg.minX ){
                    this.$magnifier.hide();
                    this.$magnifiedArea.hide();
                }else if(this.isDisabled === false){
                    this._updateXY(evt);
                }
            }
        });

        this._on(this.$magnifier, {
            mouseleave: function(){
                this.$magnifier.hide();
                this.$magnifiedArea.hide();

                this._off(this.$imgs,"mouseleave");
                this.$currentImg.trigger("mouseleave");
            },
            mousemove: function(evt) {
                if(!this.$currentImg[0] || !this.$currentImg.is(":visible") || this.$currentImg.offset().left != this.$currentImg.minX ){
                    this.$magnifier.hide();
                    this.$magnifiedArea.hide();
                }else if(this.isDisabled === false){
                    this._updateXY(evt);
                }
            }
        });
    },

    _bindImgMouseleave: function() {
        this._on(this.$imgs, {
            mouseleave: function() {
                return false;
            }
        });
    },

    _initSize: function() {
        this._calculateSize();

        //参照物的宽高、位置
        var rfrLeft = this.options.reference.offset().left;
        var rfrTop = this.options.reference.offset().top;
        var rfrWidth = this.options.reference.width();
        var rfrHeight = this.options.reference.height();

        //放大区域宽高、位置
        var magnifiedAreaLeft = rfrLeft + (this.options.reference.width() + this.options.reference.outerWidth())/2 + this.options.gap;

        this.$magnifiedArea.css({
            "width": this.size.magnifiedAreaWidth,
            "height": this.size.magnifiedAreaHeight,
            "left": magnifiedAreaLeft,
            "top": rfrTop
        });

        //放大镜宽高
        this.$magnifier.css({
            "width": this.size.magnifierWidth,
            "height": this.size.magnifierHeight
        });

        //按钮显示逻辑
        if(this.options.canDisable){
            this.$disableBtn.css({
                "top": rfrTop + rfrHeight + 10,
                "left": rfrLeft
            });
            this.$disableBtn.show();
        }
        if(this.options.controlMagnifier){
            this.$magnifierBtn.css({
                "top": rfrTop + rfrHeight + 10,
                "left": rfrLeft + rfrWidth - 80
            });
            this.$magnifierBtn.show();
        }
    },

    _enterImg: function(evt) {
        this.$magnifiedImg.attr("src","");
        this.$currentImg = $(evt.target);
        this._currentImgSize();
        this._loadMagnifiedImg();

        this._updateXY(evt);
        
        this.$magnifier.show();
        this.$magnifiedArea.show();
    },

    _loadMagnifiedImg: function() {
        //根据当前的被放大图片，修改放大图片的src
        var originalSrc = this.$currentImg.attr("src");
        var src = this.$currentImg.attr("data-large-src");
        src = src ? src : originalSrc;

        this.$magnifiedImg.attr("src",src);
    },

    _currentImgSize: function() {
        //当前被放大图片的宽高 
        this.$currentImg.currentImgWidth = this.$currentImg.width();
        this.$currentImg.currentImgHeight = this.$currentImg.height();

        //放大镜在当前图片中的合理坐标范围
        this.$currentImg.minX = this.$currentImg.offset().left;
        this.$currentImg.maxX = this.$currentImg.minX + this.$currentImg.currentImgWidth - this.$magnifier.width();
        this.$currentImg.minY = this.$currentImg.offset().top;
        this.$currentImg.maxY = this.$currentImg.minY + this.$currentImg.currentImgHeight - this.$magnifier.height();
    },

    _updateMagnifiedImgWH: function() {
        //当前放大图片宽高
        this.$magnifiedImg.css({
            "width": this.$currentImg.currentImgWidth * this.options.multiple,
            "height": this.$currentImg.currentImgHeight * this.options.multiple
        });
    },

    _updateXY: function(evt) {
        var mouseInImg = (evt.pageX >= this.$currentImg.minX ) && (evt.pageX <= this.$currentImg.maxX + this.$magnifier.width()) &&  (evt.pageY >= this.$currentImg.minY ) && (evt.pageY <= this.$currentImg.maxY + this.$magnifier.height()) ;
        if(!mouseInImg ) {
            this.$magnifier.hide();
            this.$magnifiedArea.hide();
        }

        //放大镜坐标
        magnifierX = evt.pageX - this.$magnifier.width()/2;
        magnifierY = evt.pageY - this.$magnifier.height()/2;

        //禁止放大镜越界
        if(magnifierX <= this.$currentImg.minX) {
            magnifierX = this.$currentImg.minX;
        }else if(magnifierX >= this.$currentImg.maxX) {
            magnifierX = this.$currentImg.maxX;
        }

        if(magnifierY <= this.$currentImg.minY) {
            magnifierY = this.$currentImg.minY;
        }else if(magnifierY >= this.$currentImg.maxY) {
            magnifierY = this.$currentImg.maxY;
        }

        //放大镜与放大图片的坐标赋值
        this.$magnifier.css({
            "left": magnifierX,
            "top": magnifierY
        });
        this.$magnifiedImg.css({
            "left": -( magnifierX - this.$currentImg.minX ) * this.options.multiple,
            "top": -( magnifierY - this.$currentImg.minY ) * this.options.multiple
        });

        //鼠标在图片中的坐标        
        coordX = evt.pageX - this.$currentImg.offset().left;
        coordY = evt.pageY - this.$currentImg.offset().top;
        this.$mouseCoord.text( "X:"+parseInt(coordX,10)+"  Y:"+parseInt(coordY,10));
    },

    //放大镜、放大图片宽高相关计算
    _calculateSize: function(){
        this.size.eleWidth = this.element.width();
        this.size.eleHeight = this.element.height();

        this.size.magnifiedAreaWidth = this.options.magnifiedAreaWidth ? this.options.magnifiedAreaWidth : this.size.eleHeight;
        this.size.magnifiedAreaHeight = this.options.magnifiedAreaHeight ? this.options.magnifiedAreaHeight : this.size.eleHeight;
        
        //放大镜宽高，不超过图片容器宽高
        var theWidth = this.size.magnifiedAreaWidth / this.options.multiple;
        var theHeight = this.size.magnifiedAreaHeight / this.options.multiple;
        this.size.magnifierWidth = theWidth > this.size.eleWidth ? this.size.eleWidth : theWidth;
        this.size.magnifierHeight = theHeight > this.size.eleHeight ? this.size.eleHeight : theHeight;
    },

    //鼠标滚轮事件函数，改变放大倍数，向上 -1*n
    _changeMultiple: function(evt,order) {
        evt.preventDefault();

        if( order < 0 ){
            this.options.multiple = this.options.multiple + order <= 1 ? 1 : this.options.multiple + order;
        }else{
            this.options.multiple = this.options.multiple + order >= 10 ? 10 : this.options.multiple + order;
        }
        //更新放大镜、放大图片的大小与位置
        this._calculateSize();

        this.$magnifier.css({
            "width": this.size.magnifierWidth,
            "height": this.size.magnifierHeight
        });
        this._updateMagnifiedImgWH();

        //当前图片下放大镜的新限制范围
        this.$currentImg.maxX = this.$currentImg.minX + this.$currentImg.currentImgWidth - this.size.magnifierWidth;
        this.$currentImg.maxY = this.$currentImg.minY + this.$currentImg.currentImgHeight - this.size.magnifierHeight;
        
        this._updateXY(evt);
    },

    controlMagnifier: function(status) {
        if(typeof status !== "undefined" && status === true ||  status === false) {
            this.showMagnifier = status;
        } else {
            this.showMagnifier = !this.showMagnifier;
        }
        if(this.showMagnifier === true){
            this.$magnifier.css({
                "cursor": "move",
                "background": "blue"
            });
        }else if(this.showMagnifier === false) {
            this.$magnifier.css({
                "cursor": "crosshair",
                "background": "none"
            });
        }
    },

    disable: function(status) {
        if(typeof status !== "undefined" && status === true ||  status === false) {
            this.isDisabled = status;
        } else {
            this.isDisabled = !this.isDisabled;
        }
    }
});