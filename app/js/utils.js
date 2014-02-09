/*
    Various utilities
 */
// need to add a odule so it can be used through require....?
require(['$api/models'],function(models){
    'use strict';

    var wrap = function(elements,tagName){
        if(!tagName) { tagName = 'div'; }

        var wrapper = document.createElement(tagName);
        if(typeof(elements) === 'string'){ wrapper.innerText = elements;}
        else {
            if(!Array.isArray(elements)) { elements = [elements];}

            elements.forEach(function(el){
                wrapper.appendChild(el);
            });
        }
        return wrapper;
    }

    exports.wrap =  wrap;
});