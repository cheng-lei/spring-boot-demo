/**
 * @name:        QUIi18nJS
 * @version:     0.0.1
 * @date:        2015-10-12
 * @author:      wangyifeng@qiyi.com
 */
(function(win) {

	win.Qi18n = {
		version: '0.0.1'
	};

	var JQ = window.jQuery || {};
	//record the data status, after call the run function (ready) will be set to ture.
	var ready = false;

	//default options
	var config = {
		languages: 'zh-CN',
		urlprefix: 'www.iqiyi.com/i18n',
		type: 'jsonp',
		fileFormat: '.js',
		scriptId: 'QuiLangScript',
		load: 'true',
		delimiterLeft: '{{',
		delimiterRight: '}}',
		callback: function(data) {}
	};

	var init = function(conf, callback) {
		config = JQ.extend({}, config, conf);
		//determine the mode of data loading (json or jsonp), and whether the html already load the script.
		var type = config.type,
			load = config.load == 'true' ? true : false,
			languages = config.languages,
			urlprefix = config.urlprefix,
			fileFormat = config.fileFormat,
			scriptId = config.scriptId,
			url = '';

		if (type !== 'json' && type !== 'jsonp') {
			console.error('Please set the right loading type in config, it should be json or jsonp.');
		}

		//the mode is jsonp and the html has not loaded the script.
		if (load && type == 'jsonp') {
			var len = JQ('#' + scriptId).length,
				script;
			url = urlprefix + "/" + languages + fileFormat;
			if (len === 0) {
				script = document.createElement('script');
				script.setAttribute('src', url);
				script.setAttribute('id', scriptId);
				JQ('head')[0].appendChild(script);
			} else {
				JQ('#' + scriptId).remove();
				script = document.createElement('script');
				script.setAttribute('src', url);
				script.setAttribute('id', scriptId);
				JQ('head')[0].appendChild(script);
			}
		} else if (load && type == 'json') {
			var xhr = new XMLHttpRequest;
			url = urlprefix + "/" + languages + fileFormat;

			xhr.onload = function() {
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					var data = xhr.responseText;
					data = JQ.parseJSON(data);
					run(data);
				} else {
					console.log("Request was unsuccessful: " + xhr.status);
				}
			};

			xhr.open('get', url, true);
			xhr.send(null);
		}
	};

	var languagesData = {};

	var getData = function() {
		if (ready) {
			return languagesData;
		}
	};

	var get = function(key, options) {

		var tpl = languagesData[key];

		if (ready) {
			if (options && typeof(options) == 'object') {
				var left = config.delimiterLeft || '{',
					right = config.delimiterRight || '}',
					str = '',
					reg = new RegExp(left + '([.:a-z0-9_]+?)' + right, 'ig');
				try {
					str = tpl.replace(reg, function(tpl, name, index) {
						var value = options[name];
						value = (value === null) ? 'null' : value;
						value = (value === undefined) ? '' : value;
						return value;
					});
					return str;
				} catch (e) {
					console.error(e);
				}
			} else {
				return tpl;
			}
		}
	};

	var run = function(data) {
		console.log(data);
		ready = true;
		languagesData = data;
		config.callback.call(this, data);
	};

	win.Qi18n = JQ.extend(true, Qi18n, {
		init: init,
		run: run,
		config: config,
		getData: getData,
		get: get
	});

})(window);