/*
    Various utilities
*/

require(['$views/buttons#Button',],function(Button){
    'use strict';

    var make = function(tagName, innerHtml, attributes){
        var elem = document.createElement(tagName);

        if(Object.prototype.toString.call(innerHtml) == "[object Object]"){
            attributes = innerHtml;
        } else {
            elem.innerHTML = innerHtml;
        }

        if(attributes){
            Object.keys(attributes).forEach(function(key){
                elem.setAttribute(key, attributes[key]);
            });
        }
        return elem;
    }

    var wrap = function(elements,tagName){
        if(!tagName) { tagName = 'div'; }

        var wrapper = make(tagName);
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

    var map = function(array, callback){
        return [].map.call(array, callback);
    }

    var createButton = function(label, parentId){
        var parent = document.getElementById(parentId);

        var btn = Button.withLabel(label);
        parent.appendChild(btn.node);

        return btn;
    }

    var addButton = function(label, clickHandler, parentId){
        var btn = createButton(label, parentId);
        btn.node.addEventListener('click', clickHandler);

        return btn;
    }

    var addToggleButton = function(settings, parentId){
        var keyIndex = 0;
        var btn = createButton(settings[0].label, parentId);

        btn.node.addEventListener('click', function(){
            if(settings[keyIndex].click.apply(this, arguments)){
                keyIndex++;
                if(keyIndex >= settings.length){ keyIndex = 0; }
                btn.setLabel(settings[keyIndex].label);
            }
        });

        return btn;
    }

    var getUriLink = function(obj){
        var elem = wrap(obj.name, 'a');
        elem.setAttribute('href', obj.uri);
        return elem;
    }

    exports.wrap =  wrap;
    exports.forEach = forEach;
    exports.map = map;
    exports.make = make;
    exports.ui = {
        addButton: addButton,
        addToggleButton: addToggleButton,
        getUriLink: getUriLink
    };
});