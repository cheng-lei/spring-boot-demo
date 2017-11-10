/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 *
 * @file:   menuUI.js
 * @path:   js-src/widget/
 * @desc:   弹框显示两级菜单的qwidget
 * @author: zhangzhao@qiyi.com
 * @date:   2016-03-08
 */

qui.qwidget("qui.menuItemsShow", {
    //可传入的参数以及默认值
    options: {
        url: '', //一级菜单请求数据的url，二级菜单默认在相同根目录下，以value值命名的json文件
        text: 'value', //复选框显示的text的取值字段
        value: 'id', //复选框value的取值字段
        width: 600,  //dialog的宽度
        height: 340,   //dialog的高度
        title: '菜单',
        dataName: 'menuData', //菜单数据提交时的字段名 
        lableParentTempl: '<div><label class="checkbox-inline"><input type="checkbox" name="parentItems" class="parent-name" value="${id}">${value}</label></div>',
        lableChildTempl: '<div><label class="checkbox-inline"><input type="checkbox" name="childItems" class="child-name" value="${id}">${value}</label></div>',
        //获得二级菜单的请求数据的文件地址，默认参数为点击的对象
        getChildFileName: function($ele){
            return $ele.val()+'.json';
        }
    },

    privateOptions: {
        $showDialog: null,//弹框中的form对象
        $dialogNewAlbum: null,//弹框对象
        menuChecked: {},
        outerDtParentTempl: '<dl class="category-box"><dt></dt></dl>',
        outerDtChildTempl: '<dd class="child-category"><strong class="parent-name"></strong><div class="place-list" ></div></dd>',
        hiddenInput: '<input type="hidden" name="menuData" autocomplete="off" value="">',
        valueHtml: '<span class="menu-category-dispaly"></span>',
        formTemp: '<form class="form-horizontal" role="form" title=""></form>'
    },

    //绑定事件
    _create: function() {
        var self = this;
        var $formTemp = $(self.privateOptions.formTemp);
        $formTemp.attr('title',this.options.title);
        this.privateOptions.$showDialog = $formTemp;
        $.ajax({
            type:'get',
            url:this.options.url,
            data:{},
            dataType:'json',
            success:function(data) {
                if(!!data.data){
                    self.openDialog.call(self,data.data);
                }
            },
            error:function(msg) {
                alert(msg);
            }
        });

    },

    //初始化页面
    _init: function() {
        var self = this;
    },

    //处理数据，得到一级菜单列表
    packMenuElement: function(data) {
        var self = this;
        var itemHtml = $(this.privateOptions.outerDtParentTempl);

        $(this.options.lableParentTempl).tmpl(data).appendTo(itemHtml);

        return itemHtml;
    },

    //处理数据得到二级菜单
    packMenuSecondElement: function(childData, $tar) {

        var self = this;
        var itemHtml = $(self.privateOptions.outerDtChildTempl);
        
        itemHtml.attr('parent-id',$tar.val());
        itemHtml.find('strong.parent-name').html($tar.parent().text());

        $(self.options.lableChildTempl).tmpl(childData).appendTo(itemHtml.find('div.place-list'));

        self.privateOptions.$showDialog.append(itemHtml);
    },

    //一级菜单的点击事件
    change: function(event,point) {
        var self = this;
        var tar = event.target||event.srcElemnt;
        var $secondItems = self.privateOptions.$showDialog.find('dd[parent-id = "' + $(tar).val() + '"]');
        var $checkbox = $secondItems.find('input');
        var url = this.getRootPath(this.options.url)+this.options.getChildFileName($(tar));

        $.ajax({
            type:'get',
            url:url,
            data:{},
            dataType:'json',
            success:function(data){
                if(!!data.data){
                    self.showLevelTwo.call(self, $secondItems, data.data, $(tar), $checkbox);
                }
            },
            error:function(msg) {
                alert(msg);
            }
        });
    },

    //显示二级菜单
    showLevelTwo: function($secondItems, data, $tar, $checkbox){
        var self = this;
        //类型为radio时，要把除当前选择项的二级菜单都移掉
        if($tar.attr('type')=='radio'){
            self.privateOptions.$showDialog.find('dd:not([parent-id = "' + $tar.val() + '"])').remove();
        }

        if(!$secondItems.length){
            this.packMenuSecondElement(data, $tar);
        }else if($tar.is(':checked')){
            $secondItems.show();
        }else{
            $secondItems.hide();
            $checkbox.prop('checked', false);//一级菜单取消勾选后，二级菜单的对应项也需要全部取消勾选
        }
    },

    //提交弹框中的数据
    submitAlertData: function(){
        var self = this;

        var $firstLevel = self.privateOptions.$showDialog.find('input.parent-name');
        var $appendHtml = $(this.privateOptions.valueHtml);

        $firstLevel.each(function(index, el){

            var $el = $(el);

            if($el.is(':checked')){
                var arr = [];
                var $secondItems = self.privateOptions.$showDialog.find('dd[parent-id = "' + $el.val() + '"]');
                var checkbox = $secondItems.find('input');
               
                $appendHtml.append($el.parent().clone());
                
                for (var i = checkbox.length - 1; i >= 0; i--) {
                    var checkedObj = checkbox[i];
                    if($(checkedObj).is(':checked')){
                        $appendHtml.append($(checkedObj).parent().clone());
                        arr.push($(checkedObj).parent().text());
                    }
                }

                self.privateOptions.menuChecked[$el.parent().text()] = arr;
            }
        });

        //移掉原有的显示列表
        if(!!$(this.element).next().length){
            $(this.element).next().remove();
        }

        //处理存value的隐藏input
        if(!$(this.element).prev().length){
            $(this.element).parent().prepend($(this.privateOptions.hiddenInput).attr('name',this.options.dataName));//隐藏元素加到button前面
            $(this.element).prev().val(JSON.stringify(self.privateOptions.menuChecked));
        }else{
            $(this.privateOptions.hiddenInput).val(JSON.stringify(self.privateOptions.menuChecked));
        }

        $appendHtml.find('input').attr('disabled', true);
        $(this.element).parent().append($appendHtml);//显示加到button后面

    },

    //点击按钮打开菜单窗口
    openDialog: function(data){
        var self = this;

        if (this.privateOptions.$showDialog.children().length <= 0) {
            this.privateOptions.$showDialog.append(this.packMenuElement(data));
        }

        //绑定元素的点击事件
        $(this.element).bind('click.menuItemsShow', function(ele){
            self.privateOptions.$dialogNewAlbum = self.privateOptions.$showDialog.dialog({
                autoOpen: false,
                resizable: false,
                height: self.options.height,
                width: self.options.width,
                modal: true,
                buttons: {
                    "确认": function() {
                        self.submitAlertData();
                        $(this).dialog('close');
                    },
                    "取消": function() {
                        $(this).dialog('close');
                    }
                }
            });

            self.privateOptions.$dialogNewAlbum.dialog('open');

            //绑定一级菜单的点击事件
            $(self.privateOptions.$dialogNewAlbum).find('dl input').bind('click.menuItemsShow', function(ele){
                self.change(ele,self);
            });
        });
    },

    //获得文件的根目录
    getRootPath: function(path){
        var index = path.lastIndexOf('/')+1;
        return path.substring(0,index);
    }

});


