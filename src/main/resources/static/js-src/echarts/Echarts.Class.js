/**
 * Copyright 2016 Qiyi.com All rights reserved.
 *
 * file: lego
 * path: js-src/
 * description: Echarts
 * author: jingtang@qiyi.com
 * date: 2016-7-13
 */
define(
    [
        'echarts/Echarts'
    ],
    function(Echarts) {
        Echarts.Class = Arm.create('Class', {
            name: 'Echarts.Class',
            properties: {},

            options: {},
            init: function() {
                this.logger = Logger.get(this);
            },
            getData: function(sData) {
                var paintData = [];
                var months=['jan','feb','mar','apr','may','june','july','july','aug','sep','oct','nov','dec'];
                
                for(var i=0;i<months.length;i++){
                    paintData.push(sData[months[i]]);
                }
              

                return paintData;
            }


        });
    }
);
