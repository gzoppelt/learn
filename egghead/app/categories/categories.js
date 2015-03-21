angular.module('eggly.categories', [
    'eggly.models.categories'
])
    .config(function ($stateProvider) {
        $stateProvider
        /*
            .state('temp', {
                url: '/',
                templateUrl: 'app/categories/categories.tmpl.html',
                controller: 'MainController'
            })
        */
            .state('eggly.categories', {
                url: '/',
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
    .controller('CategoriesController', function CategoriesController($state, CategoriesModel){
        var catc = this;
        catc.categories = CategoriesModel.getCategories().then(function (result) {
            catc.categories = result;
        });

        catc.currentCategory = null;

        catc.setCurrentCategory = function (category) {
            catc.currentCategory = category;
            if (category !== null) {
                $state.go('eggly.bookmarks', {category:category.name});
            } else {
                $state.go('eggly.bookmarks', {category: null});
            }
        };

        catc.isCurrentCategory = function (category) {
            return catc.currentCategory !== null && category.name === catc.currentCategory.name;
        };
    })



;