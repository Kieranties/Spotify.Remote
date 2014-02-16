/*
    Log utility module
*/

require([
    'js/utils'
], function(utils) {
    'use strict';

    var init = function(element){

        this.success = function(msg){
            console.log.apply(console, arguments);
            writeToElement(msg, 'success');
        }

        this.error = function(msg){
            console.error.apply(console, arguments);
            writeToElement(msg, 'error');
        }

        this.info = function(msg){
            console.info.apply(console, arguments);
            writeToElement(msg, 'info');
        }

        this.warn = function(msg){
            console.warn.apply(console, arguments);
            writeToElement(msg, 'warning');
        }

        var writeToElement = function(msg, type){
            if(element){
                var log = utils.make('span',msg,{class: type});
                element.insertBefore(log, element.firstChild);
            }
        }
    }

    exports.Log = init;
});
