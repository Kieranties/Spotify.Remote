(function ($) {

    var getArtwork = function (query, size) {
        var url = 'http://embed.spotify.com/oembed/?callback=?';
        var size = size || 'cover'
        var promise = $.getJSON(url, {url: query})
        return promise.then(function (resp) {
            return resp.thumbnail_url.replace('cover', size);
        });
    }

    var search = function (type, query, pg) {
        var uri = 'http://ws.spotify.com/search/1/' + type + '.json';
        return $.getJSON(uri, {q: query, page: pg});
    }

    var searchDefaults = {
        page: 1,
        artwork: 'cover',
        template: 'simpleResult',
        limit: undefined
    }

    $.fn.spotify = function (type, query, options) {
        var type = type || 'track';
        var settings = $.extend({}, searchDefaults, options);
        var promise = search(type, query, settings.page);
        var $resultList = $('.result-list', this).empty();
        var $resultCount = $('.result-count', this).empty();

        return promise.then(function (resp) {
            $resultCount.text(resp.info.num_results);
            var count = 1; //don't use index in case loading is out of sync
            resp[type + 's'].slice(0,settings.limit).forEach(function (entry) {
                var params = {
                    href: entry.href,
                    name: entry.name,
                    type: type
                }
                if (type === 'track') {
                    params.artist = entry.artists[0].name;
                    params.album = entry.album.name;
                }
                getArtwork(entry.href, settings.artwork)
                    .done(function (artwork) {
                        params.artwork = artwork;
                        params.count = count++;
                        var el = document.handlebars[settings.template](params);
                        $resultList.append(el);
                    });
            });
        });
    }
})(jQuery);

/*
 $(function(){
 var getArtwork = function(query, callback){
 var url = 'http://embed.spotify.com/oembed/?callback=?';
 $.getJSON(url, {url: query}, function(resp){
 callback(resp.thumbnail_url);
 });
 };

 var searchTracks = function(query, pg){
 var uri = 'http://ws.spotify.com/search/1/track.json';
 var $wrap = $('#track-results');

 $.getJSON(uri,{q: query, page: pg}, function(resp){
 $('.result-count', $wrap).text(resp.info.num_results);
 var $resultList = $('.result-list', $wrap);
 resp.tracks.forEach(function(track, i){
 getArtwork(track.href, function(artwork){
 $resultList.append(document.handlebars.trackRow({
 href: track.href,
 name: track.name,
 artwork: artwork.replace('cover','60'),
 count: resp.offset + i,
 artistName: track.artists[0].name,
 albumName: track.album.name
 }));
 });
 });
 });
 };

 var searchArtist = function(query, limit){
 var uri = 'http://ws.spotify.com/search/1/artist.json';
 var $wrap = $('#artist-results');

 $.getJSON(uri, {q: query}, function(resp){
 $('.result-count', $wrap).text(resp.info.num_results);
 var $resultList = $('.result-list', $wrap);
 resp.artists.slice(0,limit).forEach(function(artist){
 getArtwork(artist.href, function(artwork){
 $resultList.append(document.handlebars.simpleResult({
 href: artist.href,
 name: artist.name,
 artwork: artwork
 }));
 });
 });
 });
 };

 var searchAlbum = function(query, limit){
 var uri = 'http://ws.spotify.com/search/1/album.json';
 var $wrap = $('#album-results');

 $.getJSON(uri, {q: query}, function(resp){
 $('.result-count', $wrap).text(resp.info.num_results);
 var $resultList = $('.result-list', $wrap);
 resp.albums.slice(0,limit).forEach(function(album){
 getArtwork(album.href, function(artwork){
 $resultList.append(document.handlebars.simpleResult({
 href: album.href,
 name: album.name,
 artwork: artwork
 }));
 });
 });
 });
 };

 var getQsParam = function(name) {
 var half = location.search.split(name + '=')[1];
 return half ? decodeURIComponent(half.split('&')[0]) : null;
 }

 var doSearch = function(){
 var query = $('#search').val();
 if(!!query){
 $('.result-count, .result-list').empty();
 searchArtist(query, 3);
 searchAlbum(query, 3);
 searchTracks(query, 1);
 history.pushState(null, null, "?q=" + query);
 }
 return false;
 }

 $('#searchForm').on('submit', doSearch);
 $('#search').val(getQsParam('q'));
 doSearch();
 });
 */