/*
    Playlist module
*/

require([
  '$api/models',
  '$api/library#Library'
], function(models, Library) {
  'use strict';

    var getPlaylistByName = function(playlistName){
        var promise = new models.Promise();
        Library.forCurrentUser().playlists.snapshot().done(function(snapshot){
            var found = null;
            snapshot.toArray().forEach(function(playlist){
                if(playlist && playlist.name === playlistName){
                    found = playlist;
                    return;
                }
            });
            if(found){ promise.setDone(found); }
            else { promise.setFail("No playlist found"); }
        });
        return promise;
    }

    var createPlaylist = function(playlistName){
        var promise = new models.Promise();
        getPlaylistByName(playlistName)
            .done(function(pl){ promise.setFail(pl, "Playlist exists"); })
            .fail(function(){
                models.Playlist.create(playlistName)
                    .done(function(pl){ promise.setDone(pl); })
                    .fail(function(err, msg){ promise.setFail(err, msg);})
            });

        return promise;
    }

    exports.createPlaylist = createPlaylist;
    exports.getPlaylistByName = getPlaylistByName;
});