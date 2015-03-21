angular.module('eggly.bookmarks', [
    'eggly.bookmarks.create',
    'eggly.bookmarks.edit',
    'eggly.models.bookmarks',
    'eggly.models.categories'
])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.bookmarks', {
                url: '/bookmarks/:category',
                views: {
                    'categories@': {
                        templateUrl:    'app/categories/categories.tmpl.html',
                        controller:     'CategoriesController',
                        controllerAs:   'catc'
                    },
                    'bookmarks@': {
                        templateUrl:    'app/bookmarks/bookmarks.tmpl.html',
                        controller:     'BookmarksController',
                        controllerAs:   'bmc'
                    }
                }
            })
    })
    .controller('BookmarksController', function BookmarksController($stateParams, BookmarksModel){
        var bmc = this;
        var cat = $stateParams.category;
        bmc.currentCategoryName = cat;
        BookmarksModel.getBookmarks().then(function (result) {
            bmc.bookmarks = result;
        });

        if (cat === null) {
            bmc.isCreating = false;
            bmc.isEditing  = false;
        }

        // Creating state

        bmc.startCreating = function () {
            bmc.isCreating = true;
            bmc.isEditing  = false;
            bmc.resetCreateForm();
        };
        bmc.cancelCreating = function () {
            bmc.isCreating = false;
        };
        bmc.shouldShowCreating = function () {
            return bmc.isCreating && !bmc.isEditing && bmc.currentCategory !== null;
        };

        // Editing state

        bmc.startEditing = function () {
            bmc.isEditing   = true;
            bmc.isCreating  = false;
        };
        bmc.cancelEditing = function () {
            bmc.isEditing = false;
        };
        bmc.shouldShowEditing = function () {
            return bmc.isEditing && !bmc.isCreating;
        };

        bmc.cancelCreating();
        bmc.cancelEditing();

        // CRUD
        bmc.resetCreateForm = function () {
            bmc.newBookmark = {
                id: bmc.bookmarks.length,
                title: '',
                url: '',
                category: bmc.currentCategory.name
            };
        };
        bmc.createBookmark = function (bookmark) {
            bmc.bookmarks.push(bookmark);
            bmc.resetCreateForm();
        };

        bmc.editedBookmark = null;

        bmc.isSelectedBookmark = function (bookmarkId) {
            return bmc.editedBookmark !== null && bmc.editedBookmark.id === bookmarkId;
        };

        bmc.setEditedBookmark = function (bookmark) {
            bmc.editedBookmark = angular.copy(bookmark);
            //otherwise the model would be written immediately even when cancelled
        };

        bmc.updateBookmark = function (bookmark) {
            var index = _.findIndex(bmc.bookmarks, function (b) {
                return b.id == bookmark.id;
            });
            bmc.bookmarks[index] = bookmark;
            bmc.editedBookmark = null;
            bmc.isEditing = false;
        };

        bmc.deleteBookmark = function (bookmark) {
            _.remove(bmc.bookmarks, function (b) {
                return b.id == bookmark.id;
            });
        };

    })


;