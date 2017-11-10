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
        StepProgressBar.Dao = Arm.create('Dao', {
            name: 'StepProgressBar.Dao',
            getSteps: function(data, handle, url) {
                url = url || './data/stepProgressBar.json';
                this.ajax(url, 'GET', data, handle);
            }
        });
    }
);
