/*
    Root application script
*/

require([
  '$api/models'
], function(models) {
  'use strict';

    function handleTabs(){
        var args = models.application.arguments;
        var newPath = "/" + args[0] + ".html";
        if(newPath != location.pathname) { location.pathname = newPath; }
    }

    models.application.load('arguments').done(handleTabs);
    models.application.addEventListener('arguments', handleTabs);
});