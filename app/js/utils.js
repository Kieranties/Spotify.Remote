/*
    Various utilities
*/

require(['$views/buttons#Button',],function(Button){
    'use strict';

    var wrap = function(elements,tagName){
        if(!tagName) { tagName = 'div'; }

        var wrapper = document.createElement(tagName);
        if(typeof(elements) === 'string'){ wrapper.innerText = elements;}
        else {
            if(!Array.isArray(elements)) { elements = [elements];}

            forEach(elements, function(el){
                wrapper.appendChild(el);
            });
        }
        return wrapper;
    }

    var forEach = function(array, callback){
        [].forEach.call(array,callback);
    }

    var addButton = function(label, clickHandler, parentId){
        var parent = document.getElementById(parentId);

        var btn = Button.withLabel(label);
        btn.node.addEventListener('click', clickHandler);
        parent.appendChild(btn.node);
    }


    exports.wrap =  wrap;
    exports.forEach = forEach;
    exports.ui = { addButton: addButton };
});