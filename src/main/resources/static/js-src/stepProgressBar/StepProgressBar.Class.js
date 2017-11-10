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
        StepProgressBar.Class = Arm.create('Class', {
            name: 'StepProgressBar.Class',
            properties: {
                dao: null,
                steps: null
            },

            options: {
            },

            init: function(options) {
                var self = this;
                this.logger = Logger.get(this);
                this.dao = this.action.getDao();
            },

            fetchSteps: function(handle) {
                this.dao.getSteps({}, handle);
            },

            setSteps: function(steps) {
                if (this.steps instanceof Arm.ArrayList) {
                    this.steps.update(steps);
                } else {
                    this.steps = new Arm.ArrayList(steps);
                }
            },

            getSteps: function() {
                return this.steps;
            },

            setFormParam: function(formParam) {
                if (this.formParam instanceof Arm.Model) {
                    this.formParam.update(formParam);
                } else {
                    this.formParam = new Arm.Model(formParam);
                }
            },

            getFormParam: function($form) {
                var _options = {
                    editable: function($form, data) {
                        return data.editable === '1';
                    },
                    order: function($form, data) {
                        return data.order === '1';
                    }
                };
                return $form.formit('getValues', _options);
            }
        });
    }
);
