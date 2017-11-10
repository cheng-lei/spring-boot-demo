/**
 * Copyright 2014 Qiyi Inc. All rights reserved.
 *
 * @file:   Fibind.Util.js
 * @path:   js-src/fibind/
 * @desc:   Fibind静态公共方法
 * @author: yangpengfei@qiyi.com
 * @date:   2015-03-12
 */

///import js-src/lib/
///import js-src/com/

define(
    [
        'fibind/Fibind'
    ],
    function(Fibind) {
        Fibind.Util = Arm.create('Util', {
            name: 'Fibind.Util',

            copyValue: function(e) {
                var $form = $(this).closest('form');
                var selector = $(this).attr('data-copy-to');
                $form.find(selector).val(this.value);
            },

            alertChosenValue: function(e) {
                if(this.checked) {
                    $.tip({
                        theme: 'success',
                        content: 'You choosed this value:' + this.value + '!'
                    });
                }
            },

            // second set of handlers
            showTypedLetterLength: function(e) {
                $(this).closest('.controls').find('.help-info .letter-num').text( this.value.length );
            },

            setAttributeValue: function(e) {
                var elem = this;
                var $form = $(elem).closest('form');
                var setArgs = $(elem).attr('data-set-args') || '';
                var status;

                try {
                    setArgs = setArgs.split(',');

                    if(setArgs[2]) {
                        $form.find(setArgs[0]).attr(setArgs[1], setArgs[2]);
                    } else {
                        $form.find(setArgs[0]).removeAttr(setArgs[1]);
                    }

                } catch(ex) {
                    console.error('Error arguments!');
                }
            }
        });
    }
);