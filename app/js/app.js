/*
    Root application script
*/

require([
  '$api/models',
  '$views/buttons#Button',
  '$views/popup#Popup',
  'js/playlist',
  'js/storage',
  'js/utils',
  'js/logger'
], function(models, Button, Popup, playlist, store, utils, logger) {
  'use strict';

    var log = new logger.Log(document.getElementById('log'));

    var initControlButtons = function(){
        utils.ui.addToggleButton([
            { label:"Edit", click: editSettings},
            { label:"Save", click: saveSettings}
        ], "control");
        utils.ui.addButton("Sync", syncPlaylists, "control").setAccentuated(true);
    }

    var setPlaylistLink = function(id, playlist){
        var link = utils.ui.getUriLink(playlist);

        var el = document.getElementById(id);
        el.setAttribute("data-playlist-uri", playlist.uri);
        el.innerHTML = '';
        el.appendChild(link);

        log.info(el.id + " - Current playlist: " + playlist.uri);
    }

    var forEachPlaylistSetting = function(callback){
        var elements = document.querySelectorAll(".list-setting");
        utils.forEach(elements, callback);
    }

    var loadSettings = function(){

        var setFail = function(el){
            el.innerHTML = "No playlist found.";
            log.warn(el.id + " - No playlist found.");
        }

        forEachPlaylistSetting(function(el){
            var uri = store.get(el.id);

            if(!uri) { setFail(el); }
            else {
                playlist.getPlaylistByUri(uri)
                    .done(function(pl){
                        setPlaylistLink(el.id, pl);
                    })
                    .fail(function(){setFail(el); });
            }
        });
    }

    var saveSettings = function(){

        var selectors = document.querySelectorAll(".list-setting > select");
        var validation = {};
        var results = utils.map(selectors, function(select){
            var uri = select.value;
            if(!!uri){
                var key = JSON.stringify(uri);
                var val = validation[key] || 0;
                validation[key] = val+1;
            }
            return {
                id: select.parentNode.id,
                uri: uri
            }
        });
        var error;
        utils.forEach(Object.keys(validation), function(key){
            if(validation[key] > 1){
                error = 'You cannot use the same playlist for more than one setting.';
            }
        });
        if(!error){
            var set = function(id, playlist){
                store.set(id, playlist.uri);
                log.success(id + " - Playlist updated");
                setPlaylistLink(id, playlist);
            }
            utils.forEach(results, function(result){
                if(result.uri){
                    playlist.getPlaylistByUri(result.uri).done(function(pl){
                        set(result.id, pl);
                    });
                } else {
                    playlist.createPlaylist(result.id, result.id).done(function(pl){
                        set(result.id, pl);
                    })
                }
            });
            return true;
        } else {
            log.error(error, validation);
            return false;
        }
    }

    var syncPlaylists = function(){
        //nothing to do yet
        log.info("Sync in progress");
    }

    var editSettings = function(){
        var createNew = utils.make('option', 'Create new playlist', { value: ''});
        var dropdown = utils.wrap(createNew, 'select');
        playlist.getPlaylists().done(function(playlists){
            playlists.forEach(function(pl){
                if(!!pl){
                    var option = utils.make('option', pl.name, { value: pl.uri});
                    dropdown.appendChild(option);
                }
            });
            forEachPlaylistSetting(function(element){
                element.innerHTML = '';
                var clone = dropdown.cloneNode(true);
                clone.value = element.getAttribute('data-playlist-uri');
                element.appendChild(clone);
            });
        });
        return true;
    }

    // load the settings and initialize ui
    loadSettings();
    initControlButtons();
});