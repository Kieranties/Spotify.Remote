/*
    Root application script
*/

require([
  '$api/models',
  '$views/ui#UI'
], function(models, UI) {
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
});