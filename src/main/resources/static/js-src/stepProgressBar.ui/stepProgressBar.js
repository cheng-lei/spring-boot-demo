/*
 * Copyright 2017 Qiyi.com All rights reserved.
 *
 * file: stepProgressBar.js
 * path: js-src/stepProgressBar.ui
 * description: stepProgressBar qwidget
 * author: shihuanyu
 * date: 2017-5-16
 */

qui.qwidget('qui.stepProgressBar', {
    version: '0.0.1',

    tmpl: [
        '<script type="text/x-jquery-tmpl">',
        '<ul class="step-process-bar{{if editable}} editable{{/if}}">',
        '{{each steps}}',
        '<li class="{{if $value.finish}}active{{/if}}">',
        '<span class="step{{if order}} order{{/if}}" aria-hidden="true">',
        '<i class="left-dot"></i>',
        '<i class="right-dot"></i>',
        '{{if order}}<i class="order">${$index + 1}</i>{{/if}}',
        '<i class="glyphicon glyphicon-ok"></i>',
        '</span>',
        '<span class="link"></span>',
        '<span class="step-desc">${$value.desc}</span>',
        '</li>',
        '{{/each}}',
        '</ul>',
        '<script>'
    ].join(''),

    options: {
        // 渲染数据
        steps: [],
        // 是否可编辑
        editable: false,
        // 是否展示序号
        order: false,
        // 主题颜色
        color: null
    },

    privateOptions: {
        defaultColor: '#68a305',
        barSelector: '.step-process-bar',
        stepSelector: '.step-process-bar span.step',
        stepContainerSelector: '.step-process-bar > li',
        colorSelector: [
            '.step-process-bar li i.left-dot',
            '.step-process-bar li i.right-dot',
            '.step-process-bar li span.link'
        ].join(','),
        colorActiveSelector: [
            '.step-process-bar li.active span.step',
            '.step-process-bar li.active i.left-dot',
            '.step-process-bar li.active i.right-dot',
            '.step-process-bar li.active span.link'
        ].join(',')
    },

    /**
     * 绑定编辑事件
     */
    processEditable: function() {
        var _self = this;
        var _options = _self.options;
        var _privateOptions = _self.privateOptions;
        if (_options.editable) {
            $(_privateOptions.stepSelector).on('click', function() {
                var _container = $(this).parent();
                if (_container.hasClass('active') && !_container.next().hasClass('active')) {
                    _container.removeClass('active');
                } else {
                    $(_privateOptions.stepContainerSelector).removeClass('active');
                    _container.addClass('active').prevAll().addClass('active');
                }
                $(_privateOptions.stepSelector).css('background-color', '');
                $(_privateOptions.colorSelector).css('background-color', '#e4e4e7');
                $(_privateOptions.colorActiveSelector).css('background-color', $(_privateOptions.barSelector).data('color'));
            });
        }
    },

    /**
     * 主题颜色设置
     */
    processColor: function() {
        var _self = this;
        var _options = _self.options;
        var _privateOptions = _self.privateOptions;
        $(_privateOptions.barSelector).attr('data-color', _options.color || _privateOptions.defaultColor);
        $(_privateOptions.colorActiveSelector).css('background-color', $(_privateOptions.barSelector).data('color'));
    },

    /**
     * 初始化
     */
    _init: function() {
        var _self = this;
        _self.element.html('').append($(_self.tmpl).tmpl(_self.options));
        this.processEditable();
        this.processColor();
    }
});
