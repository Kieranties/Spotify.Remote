/*
    Root application script
*/

require([
  '$views/buttons#Button',
  'js/playlist'
], function(Button, playlist) {
  'use strict';

    // add buttons for search listing navigation
    var wrapper = document.getElementById('control');

    var syncBtn = Button.withLabel("Sync");
    syncBtn.node.addEventListener('click', function(){
        // do sync
    });

    var saveBtn = Button.withLabel("Save");
    saveBtn.node.addEventListener('click', function(){
        // do save
        playlist.createPlaylist('Megadeth').always(function(x, y) { console.log(x,y); });
        playlist.createPlaylist('fail').always(function(x, y) { console.log(x, y); });
        playlist.createPlaylist('humble bundle').always(function(x, y) { console.log(x, y); });

    });

    wrapper.appendChild(syncBtn.node);
    wrapper.appendChild(saveBtn.node);
});