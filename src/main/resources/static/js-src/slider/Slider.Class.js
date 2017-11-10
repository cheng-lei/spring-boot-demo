/**
 * Copyright 2015 Qiyi Inc. All rights reserved.
 *
 * @file:   Slider.Class.js
 * @author: yanghuan@qiyi.com
 */

qui(function() {
    Slider.Class = Arm.create('Class', {
        name: 'Slider.Class',
        properties: {
            sliderList: null
        },
        options: {
        },

        init: function(options) {
        },

        saveData: function(sliderList) {
            var list = this.sliderList;
            if (list instanceof Arm.ArrayList) {
                list.update(sliderList);
            } else {
                this.sliderList = new Arm.ArrayList(sliderList);
            }
        },

        getOneData: function(index) {
            return this.sliderList[index];
        },

        getAllData: function() {
            return this.sliderList;
        },

        achieveData: function(index, callback) {
            var self = this;
            self.action.getDao().getData(index, {
                success: function(response) {
                    self.saveData(response.data.result);
                    callback.call();
                }
            });
        },

        saveUpdateInfo: function(data) {
            var self = this;
            self.action.getDao().saveData(data);
        }
    });
});
