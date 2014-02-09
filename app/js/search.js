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

  var doSearch = function(query){
    var results = search.Search.search(query);

    lists.forEach(function(entry){
      entry.list.destroy();
    })
    
    lists = [
      { id: 'album-results', list: List.forCollection(results.albums, {type: 'albums', fields: ['image', 'album', 'artist'], style: 'rounded'}) },
      { id: 'artist-results', list: List.forCollection(results.artists, {type: 'artists', fields: ['image', 'artist'], style: 'rounded'}) },
      { id: 'track-results', list: List.forCollection(results.tracks, {type: 'tracks', style: 'rounded'}) }
    ];

    bindLists();
  }

  //bind to search box
  document.getElementById('searchbox').addEventListener('search', function(evt){
    doSearch(evt.currentTarget.value);
  });
});