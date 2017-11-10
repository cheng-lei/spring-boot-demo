/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Slider.View.js
 * @author: yanghuan@qiyi.com
 */

qui(function() {
    Slider.View = Arm.create('View', {
        name: 'Slider.View',
        properties: {
            class: null,
            view: null,
            $pictureContainer1: null,
            $templateContainer1: null,
            $pictureContainer2: null,
            $templateContainer2: null,
            $updateInfoContainer: null,
            $updateInfoTemplate: null,
            index: 0
        },
        options: {
            pictureSelector1: '#pictureArea1',
            templateSelector1: '#templateRow1',
            pictureSelector2: '.picture',
            templateSelector2: '#templateRow2',
            containerSelector: '#sliderContainer',
            updateInfoTemplateSelector: '#TemplateUpdateInfo',
            updateInfoContainerSelector: '#updateInfoArea'
        },

        init: function(options) {
            var self = this;
            this.class = this.class || this.getClass({});
            this.$form = this.find('div.click-container');
            this.$pictureContainer1 = $(this.options.pictureSelector1);
            this.$templateContainer1 = $(this.options.templateSelector1);
            this.$pictureContainer2 = $(this.options.pictureSelector2);
            this.$templateContainer2 = $(this.options.templateSelector2);

            this.$updateInfoTemplate = $(this.options.updateInfoTemplateSelector);
            this.$container = $(this.options.containerSelector);
            this.logger = Logger.get(this);

            var $tempDialogContainer = $(this.options.updateInfoContainerSelector);
            if ($tempDialogContainer.children().length <= 0) {
                $tempDialogContainer.html(this.$updateInfoTemplate.tmpl({}));
            }
            this.$updateInfoContainer = $tempDialogContainer.dialog({
                autoOpen: false,
                resizable: false,
                height: 300,
                width: 450,
                modal: true,
                buttons: {
                    "保存": function() {
                        self.savePictureData();
                        $(this).dialog("close");
                    },
                    "取消": function() {
                        $(this).dialog("close");
                    }
                }
            });
        },

        events: {
            'click img': 'imgClicked'
        },

        imgClicked: function(evt, ele) {
            this.$updateInfoContainer.dialog("open");
            this.$updateInfoContainer.find('input:first').val($(ele).attr('alt'));
        },

        savePictureData: function() {
            var self = this;

            var pictureName = this.$updateInfoContainer.find('input:first').val();
            var pictureType = this.$updateInfoContainer.find('input:radio[name="category"]:checked').val();
            var picturePlace = this.$updateInfoContainer.find('select option:checked').text();

            var updateInfo = {};
            updateInfo.pictureName = pictureName;
            updateInfo.pictureType = pictureType;
            updateInfo.picturePlace = picturePlace;

            self.class.saveUpdateInfo(updateInfo);
        },


        sliderEvent: function() {
            var self = this;

            self.$container.find('#sliderArea1').slider({
                slide: function(event, ui) {
                    var index = ui.value % 10;
                    var oneData = self.class.getOneData(index);
                    self.render(self.$pictureContainer1, self.$templateContainer1, oneData);

                    var position = self.action.getUtil().getSliderPosition(this);
                    self.$container.find('#sliderText').css({
                        'border': '1px solid silver',
                        'background': '#ffeeee',
                        'position': 'absolute',
                        'left': position.xx,
                        'top': position.yy
                    }).text(oneData.Name);
                }
            });
      
            self.$container.find('#sliderArea2').slider({
                slide: function(event, ui) {
                    var newLeft = self.action.getUtil().getPictureNewLeft(self.$container, ui.value);
                    self.$container.find('.picture-style').css('left', '-' + newLeft + 'px');
                    if(ui.value === 0){
                        self.$container.find('.picture-style').css('left', '-17px');
                    }
                }
            });
        },

        renderData: function() {
            var self = this;
            this.class.achieveData(this.index, function(){
                var oneData = self.class.getOneData(self.index);
                var allData = self.class.getAllData();
                self.render(self.$pictureContainer1, self.$templateContainer1, oneData);
                self.render(self.$pictureContainer2, self.$templateContainer2, allData);
                self.sliderEvent();
            });
        },

        run: function() {
            this.renderData();
        }
    });
});
