/*
    Root application script
*/

require([
  '$api/models',
  '$views/buttons#Button',
  '$views/popup#Popup',
  'js/playlist',
  'js/storage',
  'js/utils'
], function(models, Button, Popup, playlist, store, utils) {
  'use strict';

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
    }

    var forEachPlaylistSetting = function(callback){
        var elements = document.querySelectorAll(".list-setting");
        utils.forEach(elements, callback);
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
                        setPlaylistLink(el.id, pl);
                        promise.setDone();
                    })
                    .fail(function(){setFail(el, promise); });
            }
            promises.push(promise);
        });

        return models.Promise.join(promises);
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
        console.log(results);
        if(!error){
            var set = function(id, playlist){
                store.set(id, playlist.uri);
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
            return false;
        }
    }

    var syncPlaylists = function(){
        //nothing to do yet
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