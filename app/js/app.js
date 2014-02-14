/*
    Root application script
*/

require([
  '$api/models',
  '$views/buttons#Button',
  'js/playlist',
  'js/storage',
  'js/utils'
], function(models, Button, playlist, store, utils) {
  'use strict';

    var setPlaylistSetting = function(element, playlist){
        store.set(element.id, playlist.uri);
        element.setAttribute("data-playlist-uri", playlist.uri);
        element.innerHTML = playlist.name;
    }

    var forEachPlaylistSetting = function(callback){
        var elements = document.querySelectorAll(".list-setting");
        utils.forEach(elements, callback);
    }

    var createMissingPlaylists = function(){
        forEachPlaylistSetting(function(el){
            var uri = el.getAttribute("data-playlist-uri");
            if(!uri){
                playlist.createPlaylist(el.id)
                    .done(function(pl){ setPlaylistSetting(el, pl); })
                    .fail(function(err, msg){ console.log(err, msg)});
            }
        });
    }

    var initControlButtons = function(missingPlaylists){
        if(missingPlaylists){
            utils.ui.addButton("Create Missing Playlists", createMissingPlaylists, "control");
        } else {
            utils.ui.addButton("Sync", syncPlaylists, "control");
        }
        utils.ui.addButton("Save", saveSettings, "control");
    }

    var loadSettings = function(){
        var promises = [];

        var setFail = function(el, promise){
            el.innerHTML = "No playlist found.";
            promise.setFail();
        }

        forEachPlaylistSetting(function(el){
            var promise = new models.Promise();
            var uri = store.get(el.id);

            if(!uri) { setFail(el, promise); }
            else {
                playlist.getPlaylistByUri(uri)
                    .done(function(pl){
                        setPlaylistSetting(el, pl);
                        promise.setDone();
                    })
                    .fail(function(){setFail(el, promise); });
            }
            promises.push(promise);
        });

        return models.Promise.join(promises);
    }

    var saveSettings = function(){
        // nothing to do yet
    }

    var syncPlaylists = function(){
        //nothing to do yet
    }

    // load the settings and initialize ui
    loadSettings()
        .done(function(){ initControlButtons(false)})
        .fail(function(){ initControlButtons(true)});
});