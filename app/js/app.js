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
    var artistsBtn = Button.withLabel('Artists');
    var albumsBtn = Button.withLabel('Albums');
    var tracksBtn = Button.withLabel('Tracks');
    var wrapper = document.getElementById('search-control');
    artistsBtn.node.addEventListener('click', function(){
        document.getElementById('artists').scrollIntoView();
    });
    albumsBtn.node.addEventListener('click', function(){
        document.getElementById('albums').scrollIntoView();
    });
    tracksBtn.node.addEventListener('click', function(){
        document.getElementById('tracks').scrollIntoView();
    });
    wrapper.appendChild(artistsBtn.node);
    wrapper.appendChild(albumsBtn.node);
    wrapper.appendChild(tracksBtn.node);
});