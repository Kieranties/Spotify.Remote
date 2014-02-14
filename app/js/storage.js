/*
    Storage module
 */

require([
    '$api/models'
],function(models){

    var get = function(name){
        var value = window.localStorage.getItem(name);
        if(!!value){ value = JSON.parse(value); }
        return value;
    };

    var set = function(name, value){
        window.localStorage.setItem(name, JSON.stringify(value));
    };

    exports.get = get;
    exports.set = set;
});