/*
    Search Module
*/

require([
  '$api/models',
  '$api/search',
  '$views/list#List'
], function(models, search, List) {
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
      { id: 'search-albums', list: List.forCollection(results.albums, {type: 'albums'}) },
      { id: 'search-artists', list: List.forCollection(results.artists, {type: 'artists'}) },
      { id: 'search-tracks', list: List.forCollection(results.tracks, {type: 'tracks'}) }
    ];

    bindLists();
  }

    var init = function(){
      //bind to search box
      document.getElementById('searchbox').addEventListener('search', function(evt){
        doSearch(evt.currentTarget.value);
      });
    }

    exports.init = init;
});