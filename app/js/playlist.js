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
                if(playlist && playlist.subscribed && playlist.name === playlistName){
                    found = playlist;
                    return;
                }
            });
            if(found){ promise.setDone(found); }
            else { promise.setFail("No playlist found"); }
        });
        return promise;
    }

    var getPlaylistByUri = function(uri){
        var promise = new models.Promise();

        models.Playlist.fromURI(uri).load(['name','tracks'])
            .done(function(pl){
                if(pl.subscribed){ promise.setDone(pl) }
                else { promise.setFail(pl, 'Not subscribed.')}
            })
            .fail(function(err, msg){ promise.setFail(err,msg);});

        return promise;
    }

    var createPlaylist = function(playlistName){
        var promise = new models.Promise();
        getPlaylistByName(playlistName)
            .done(function(pl){ promise.setDone(pl); })
            .fail(function(){
                models.Playlist.create(playlistName)
                    .done(function(pl){ promise.setDone(pl); })
                    .fail(function(err, msg){ promise.setFail(err, msg);})
            });

        return promise;
    }

    exports.createPlaylist = createPlaylist;
    exports.getPlaylistByName = getPlaylistByName;
    exports.getPlaylistByUri = getPlaylistByUri;
});