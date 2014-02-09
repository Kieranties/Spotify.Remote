/*
    Search Module
*/

require([
  '$api/models',
  '$api/search',
  '$views/list#List',
  '$views/image#Image',
  'js/utils'
], function(models, search, List, Image, utils) {
  'use strict';

  var lists = [];

  var bindLists = function(){
    lists.forEach(function(entry){
      document.getElementById(entry.id).appendChild(entry.list.node);
      entry.list.init();
    });    
  }

  var bindImageView = function(collection, viewId, getImage, imgOptions){
      if(!imgOptions) { imgOptions = {width: 100, height: 100};}

      collection.snapshot().done(function(snapshot){
          var displayNode = document.getElementById(viewId);
          displayNode.innerHTML = '';
          for (var i = 0, max = snapshot.length; i < max; i++) {
              var item = snapshot.get(i);
              var image = getImage(item, imgOptions).node;
              var title = utils.wrap(item.name, 'p');

              var content = utils.wrap([image, title]);
              content.addEventListener('click', function(){
                this.classList.toggle('selected');
              });

              displayNode.appendChild(content);
          }
      })
  }

  var doSearch = function(query){
    var results = search.Search.search(query);

    bindImageView(results.artists, 'artist-results', Image.forArtist);
    bindImageView(results.albums, 'album-results', Image.forAlbum);
    bindImageView(results.tracks, 'track-results', Image.forTrack, {width:32, height:32});
//
//    lists.forEach(function(entry){
//      entry.list.destroy();
//    })
//
//    lists = [
//      { id: 'artist-results', list: List.forCollection(results.artists, {type: 'artists', fields: ['image', 'artist'], style: 'rounded', getItem: getItem}) },
//      { id: 'album-results', list: List.forCollection(results.albums, {type: 'albums', fields: ['image', 'album', 'artist'], style: 'rounded'}) },
//      { id: 'track-results', list: List.forCollection(results.tracks, {type: 'tracks', style: 'rounded'}) }
//    ];

    bindLists();
  }

  //bind to search box
  document.getElementById('searchbox').addEventListener('search', function(evt){
    doSearch(evt.currentTarget.value);
  });
});