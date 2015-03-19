var eggly = angular.module('egglyApp', []);

eggly.controller('MainController', function MainController($scope) {

    var main = this;

    main.hello = 'Hello World!';

    main.categories = [
        {"id": 0, "name": "Development"},
        {"id": 1, "name": "Design"},
        {"id": 2, "name": "Exercise"},
        {"id": 3, "name": "Humor"}
    ];

    main.bookmarks = [
        {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
        {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development"},
        {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design"},
        {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design"},
        {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise"},
        {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise"},
        {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor"},
        {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor"},
        {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor"}
    ];

    main.currentCategory = null;

    main.setCurrentCategory = function (category) {
        main.cancelCreating();
        main.cancelEditing();
        main.currentCategory = category;
    };

    main.isCurrentCategory = function (category) {
        return main.currentCategory !== null && category.name === main.currentCategory.name;
    };

    // Creating state
    main.isCreating = false;
    main.startCreating = function () {
        main.isCreating = true;
        main.isEditing  = false;
        main.resetCreateForm();
    };
    main.cancelCreating = function () {
        main.isCreating = false;
    };
    main.shouldShowCreating = function () {
        return main.isCreating && !main.isEditing && main.currentCategory !== null;
    };

    // Editing state
    main.isEditing  = false;
    main.startEditing = function () {
        main.isEditing   = true;
        main.isCreating  = false;
    };
    main.cancelEditing = function () {
        main.isEditing = false;
    };
    main.shouldShowEditing = function () {
        return main.isEditing && !main.isCreating;
    };

    // CRUD
    main.resetCreateForm = function () {
        main.newBookmark = {
            id: main.bookmarks.length,
            title: '',
            url: '',
            category: main.currentCategory.name
        };
    };
    main.createBookmark = function (bookmark) {
        console.log(bookmark);
        main.bookmarks.push(bookmark);
        main.resetCreateForm();
    };

    main.editedBookmark = null;

    main.isSelectedBookmark = function (bookmarkId) {
        return main.editedBookmark !== null && main.editedBookmark.id === bookmarkId;
    };

    main.setEditedBookmark = function (bookmark) {
        main.editedBookmark = angular.copy(bookmark);
                            //otherwise the model would be written immediately even when cancelled
    };

    main.updateBookmark = function (bookmark) {
        var index = _.findIndex(main.bookmarks, function (b) {
            return b.id == bookmark.id;
        });
        main.bookmarks[index] = bookmark;
        main.editedBookmark = null;
        main.isEditing = false;
    };

    main.deleteBookmark = function (bookmark) {
        _.remove(main.bookmarks, function (b) {
            return b.id == bookmark.id;
        });
    };

});