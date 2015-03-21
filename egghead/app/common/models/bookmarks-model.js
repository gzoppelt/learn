angular.module('eggly.models.bookmarks', [

])
    .service('BookmarksModel', function ($http) {
        var model = this;
        var bookmarks;
        var URLS = {
            FETCH: 'data/bookmarks.json'
        };

        function extract(result) {
            return result.data;
        }

        function cacheBookmarks(result) {
            bookmarks = extract(result);
            return bookmarks;
        }
        model.getBookmarks = function () {
            return $http.get(URLS.FETCH).then(cacheBookmarks);
        };
/*
        var index = _.findIndex(bmc.bookmarks, function (b) {
            return b.id == bookmark.id;
        });*/
    })
;