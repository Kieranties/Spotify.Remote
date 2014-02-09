/*
    Root application script
*/

require([
  '$api/models',
  '$views/ui#UI',
  '$views/buttons#Button'
], function(models, UI, Button) {
  'use strict';

    // bind tabs controller
    UI.init({
        header: true,
        history: true,
        views: [
            {id: 'search', element: document.getElementById('search-view')},
            {id: 'playlist', element: document.getElementById('playlist-view')},
            {id: 'blocked', element: document.getElementById('blocked-view')}
        ],
        tabs: [
            {viewId: 'search', name: 'Search'},
            {viewId: 'playlist', name: 'Playlist'},
            {viewId: 'blocked', name: 'Blocked'}
        ]
    });


    // add buttons for search listing navigation
    var wrapper = document.getElementById('search-control');

    ['Artists','Albums','Tracks'].forEach(function(entry){
        // nav node
        var btn = Button.withLabel(entry);
        btn.node.addEventListener('click', function(){
            document.getElementById(entry.toLowerCase()).scrollIntoView();
        });
        wrapper.appendChild(btn.node);
    });
});