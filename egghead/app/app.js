angular.module('egglyApp', [
    'ui.router',
    'eggly.categories',
    'eggly.bookmarks'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('eggly', {
                url: '',
                abstract: true
            })
        ;
        $urlRouterProvider.otherwise('/');
    })

    .controller('MainController', function MainController() {
        var main = this;
    })
;