
(
	function($,undefined){
		qui.qwidget('example.superEchart',$.qui.echart,{
			_setOptions: function(options){
				var self = this;
                
				options = $.extend(true,{},self.options,options);
				self._superApply(arguments);
				self.chart.setOption(options,true);
			}
		});
	}(jQuery)
);
