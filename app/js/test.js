/*
    Test module - to be remove
*/

require([
  '$api/models',
  '$views/image#Image',
  '$views/list#List'
], function(models, Image, List) {
  'use strict';

  var getList = function(){
      var obj = models.Album.fromURI("spotify:album:2mCuMNdJkoyiXFhsQCLLqw");
      var image = Image.forAlbum(obj);
      var list = List.forPlaylist(obj);

      document.getElementById('test-image').appendChild(image.node);
      document.getElementById('test-list').appendChild(list.node);
      list.init();
  }

  exports.test = getList;
});