$(function(){
    var getQsParam = function(name) {
        var half = location.search.split(name + '=')[1];
        return half ? decodeURIComponent(half.split('&')[0]) : null;
    };

    var searchFunction;

    var doSearch = function(){
        var query = $('#search').val();
        if(!!query){
            searchFunction(query);
            var qs = "?q=" + query;
            $('.pager .next a').each(function(){
                var c = $(this).attr('href').split('?')[0];
                $(this).attr('href', c + qs);
            })
        }
        return false;
    }

    document.$$ = {
        bindSearch: function(func){
            searchFunction = func;
            $('#searchForm').on('submit', doSearch);
            var current = getQsParam('q');
            if(!!current){
                $('#search').val(current).submit();
            }
        }
    }
});