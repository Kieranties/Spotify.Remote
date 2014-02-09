/*
    Search Module
*/

require([
  '$api/models',
  '$api/search',
  '$views/list#List',
  '$views/image#Image'
], function(models, search, List, Image) {
  'use strict';

  var lists = [];

  var bindLists = function(){
    lists.forEach(function(entry){
      document.getElementById(entry.id).appendChild(entry.list.node);
      entry.list.init();
    });    
  }


    var getItem = function(item, index){
        var image = item.image;
        var name = item.name;
        var node = "<li>" + name + "</li>";

        return node;
    }

  var doSearch = function(query){
    var results = search.Search.search(query);


      results.artists.snapshot(0).done(function(snapshot){
          var wrapper = document.getElementById('artist-results');
          wrapper.innerHTML = '';
          for (var i = 0, max = snapshot.length; i < max; i++) {
              var artist = snapshot.get(i);
              var image = Image.forArtist(artist, {width: 100, height: 100}).node;
              var title = document.createElement('p');
              title.innerText = artist.name;

              var entry = document.createElement('div');
              entry.appendChild(image);
              entry.appendChild(title);
              wrapper.appendChild(entry);
          }
      })
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