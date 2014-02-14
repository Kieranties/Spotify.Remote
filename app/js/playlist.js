/*
    Playlist module
*/

require([
  '$api/models',
  '$api/library#Library'
], function(models, Library) {
  'use strict';

    var getPlaylists = function(){
        var promise = new models.Promise();

        Library.forCurrentUser().playlists.snapshot()
            .done(function(snapshot){
                promise.setDone(snapshot.toArray());
            }).fail(promise.setFail);

        return promise;
    }

    var getPlaylistByUri = function(uri){
        var promise = new models.Promise();

        models.Playlist.fromURI(uri).load(['name','tracks'])
            .done(function(pl){
                if(pl.subscribed){ promise.setDone(pl) }
                else { promise.setFail(pl, 'Not subscribed.')}
            })
            .fail(promise.setFail);

        return promise;
    }

    var createPlaylist = function(playlistName){
        return models.Playlist.create(playlistName);
    }

    exports.createPlaylist = createPlaylist;
    exports.getPlaylistByUri = getPlaylistByUri;
    exports.getPlaylists = getPlaylists;
});