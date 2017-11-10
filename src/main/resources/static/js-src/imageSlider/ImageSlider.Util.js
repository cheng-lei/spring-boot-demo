/**
 * Created by yuboran_sx on 2016/6/21.
 */
define([
    'imageSlider/ImageSlider'
],function(ImageSlider){
    ImageSlider.Util=Arm.create('Util',{
        name:'ImageSlider.Util',

        imagesZoom: function(percentage,ele){
            var tarWidth=700*percentage/100;
            ele.css("width",tarWidth);
            var tarHeight=parseInt(ele.css("height"),10);
            var left=369-tarWidth/2;
            var top=235-tarHeight/2;
            ele.css({"left":left,"top":top});
        },

        imagesTransparency: function(percentage,ele){
            var tarValue=percentage/100;
            ele.css("opacity",tarValue);
        },

        imagesGrayScale: function(grayValue,ele){
            ele.css("-webkit-filter",grayValue);
        }
    });
});
