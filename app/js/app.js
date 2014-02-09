/*
    Root application script
*/

require([
  '$api/models',
  '$views/ui#UI',
  'js/search',
  'js/playlist'
], function(models, UI, search, playlist) {
  'use strict';

    // bind tabs controller
    var ui = UI.init({
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

    // bind events for tab change
    ui.addEventListener('viewchange', function(evt){
        console.log(evt);
    });

    //init search
    search.init();
    //init playlist
    playlist.init();
});