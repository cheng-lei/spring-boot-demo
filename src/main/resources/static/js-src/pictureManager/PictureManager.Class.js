/**
 * Copyright 2016 Qiyi Inc. All rights reserved.
 * 
 * @file:   PictureManager.Class.js
 * @path:   js-src/pictureManager/
 * @desc:   PictureManager模块下基础业对象类
 * @author: wuleii@qiyi.com
 * @date:   2016-09-06
 */

define(
    [
        'pictureManager/PictureManager'
    ],
    function() {
        PictureManager.Class = Arm.create('Class', {
            name: 'PictureManager.Class',
            properties: {
                picturesList: null,
                album: null
            },
            options: {
            },
            init: function(options) {
                this.logger = Logger.get(this);
            },
            setPicturesList: function(picturesList) {
                if (this.picturesList instanceof Arm.ArrayList) {
                    this.picturesList.update(picturesList);
                } else {
                    this.picturesList = new Arm.ArrayList(picturesList);
                }
            },
            getPicturesList: function() {
                return this.picturesList;
            },
            getPictureDataByKey: function(picturesList, key){
                for(var i = 0, len = picturesList.length; i < len; i++){
                    var data = picturesList[i];

                    if(data.id === key){
                        return data;
                    }
                }
            },
            setAlbum: function(data){
                var album = this.album;

                if(album instanceof Arm.Model){
                    this.album.update(data);
                }
                else{
                    this.album = new Arm.Model(data);
                }
            },
            getAlbum: function(){
                return this.album;
            },
            createAlbum: function(formData, callback){
                var self = this;
                console.log(formData);
                self.setAlbum(formData);
                console.log(self.getAlbum());
                console.log(self.getAlbum().toPlain());

                self.action.getDao().savePictureData(self.getAlbum().toPlain(), {
                    success: function(response){
                        callback.call(self, response, "success");
                    }
                });
            },
            fetchPictureData: function(callback) {
                var self = this;

                self.action.getDao().getPictureData({
                    success: function(response) {
                        //手工更新数据
                        self.setPicturesList(response.data.result);
                        callback.call(self);
                    }
                });
            }
        });
    }
);
