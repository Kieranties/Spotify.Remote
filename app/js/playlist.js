/*
    Playlist module
*/

require([
  '$api/models',
  '$views/image#Image',
  '$views/list#List'
], function(models, Image, List) {
  'use strict';

    var init = function(){
        var obj = models.Album.fromURI("spotify:album:2mCuMNdJkoyiXFhsQCLLqw");
        var image = Image.forAlbum(obj);
        var list = List.forAlbum(obj);

        document.getElementById('test-image').appendChild(image.node);
        document.getElementById('test-list').appendChild(list.node);
        list.init();
    }

    exports.init = init;
});