/**
 * [Type a brief description here]
 *
 * @desc:
 * @author: shihuanyu@qiyi.com
 * @date:   Tue May 16 2017 11:59:49 GMT+0800 (CST)
 */

define(
    [
        'stepProgressBar/StepProgressBar'
    ],
    function(StepProgressBar) {
        StepProgressBar.View = Arm.create('View', {
            name: 'StepProgressBar.View',
            properties: {
                class: null,
                $form: null,
                $stepProgressBarContainer: null
            },
            options: {
                stepProgressBarSelector: '#stepProgressBarContainer',
                formSelector: '#options'
            },
            init: function(options) {
                this.logger = Logger.get(this);
                this.class = this.action.getClass();
                this.$stepProgressBarContainer = this.find(this.options.stepProgressBarSelector);
                this.$form = this.find(this.options.formSelector);
            },
            events: {
                'click #rerender': 'render'
            },
            bindEvent: function() {

            },
            render: function(e) {
                var _options = this.class.getFormParam(this.$form);
                var _self = this;
                if (e) {
                    e.preventDefault();
                }
                this.class.fetchSteps({
                    success: function(response) {
                        _self.logger.log('render', 'render result:', response);
                        _options.steps = response.data.steps;
                        _self.$stepProgressBarContainer.stepProgressBar(_options);
                    }
                });
            },
            run: function() {
                this.render();
            }
        });
    }
);
