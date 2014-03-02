$(function(){
    var templates = {
        simpleResult: Handlebars.compile($("#simple-result").html())
    };

    var getArtwork = function(query, callback){
        var url = 'https://embed.spotify.com/oembed/?callback=?';
        $.getJSON(url, {url: query}, function(resp){
           callback(resp.thumbnail_url);
        });
    }

    var searchArtist = function(query, limit){
        var uri = 'http://ws.spotify.com/search/1/artist.json';
        var $wrap = $('#artist-results');

        $.getJSON(uri, {q: query}, function(resp){
            $('.result-count', $wrap).text(resp.info.num_results);
            var $resultList = $('.result-list', $wrap);
            resp.artists.slice(0,limit).forEach(function(artist){
                getArtwork(artist.href, function(artwork){
                    $resultList.append(templates.simpleResult({
                        href: artist.href,
                        name: artist.name,
                        artwork: artwork
                    }));
                })

            });
        });
    }

    var searchAlbum = function(query, limit){
        var uri = 'http://ws.spotify.com/search/1/album.json';
        var $wrap = $('#album-results');

        $.getJSON(uri, {q: query}, function(resp){
            $('.result-count', $wrap).text(resp.info.num_results);
            var $resultList = $('.result-list', $wrap);
            resp.albums.slice(0,limit).forEach(function(album){
                getArtwork(album.href, function(artwork){
                    $resultList.append(templates.simpleResult({
                        href: album.href,
                        name: album.name,
                        artwork: artwork
                    }));
                })

            });
        });
    }

    var doSearch = function(){
        var query = $('#search').val() + '*';
        searchArtist(query, 3);
        searchAlbum(query, 3);
    }

    $('#searchForm').on('submit', doSearch);
})