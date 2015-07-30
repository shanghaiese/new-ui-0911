(function() {

    angular
        .module('ilabConfig')
        .constant('API_PREFIX', 'http://10.223.136.7/services/api/')
        .config(route)
        .config(loadingBar)
        .config(restangular)
        .config(pagination)
        .run(beforeRun);



    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /environment
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('default', {
                url: "/",
                templateUrl: "main/welcome/welcome.html",
                controller: 'WelcomeCtrl',
                controllerAs: 'Welcome'
            })
            .state('environment', {
                url: "/environment",
                templateUrl: "main/environment/environment.html"
            })
            .state('environment.vm', {
                url: "/vm",
                templateUrl: "main/environment/vm/vm.html",
                controller: 'VMCtrl',
                controllerAs: 'VM'
            })
            .state('environment.pm', {
                url: "/pm",
                templateUrl: "main/environment/pm/pm.html",
                controller: function($scope) {
                    console.log('environment.tab2');
                    $scope.items = ["B", "List", "Of", "Items"];
                }
            })
            .state('lab', {
                url: "/lab",
                templateUrl: "main/lab/lab.html",
                controller: function() {
                    console.log('lab');
                }
            })
            .state('lab.list', {
                url: "/list",
                templateUrl: "main/lab/lab.list.html",
                controller: function($scope) {
                    console.log('lab.list');
                    $scope.things = ["A", "Set", "Of", "Things"];
                }
            });
    }

    /* config block */
    loadingBar.$inject = ['cfpLoadingBarProvider'];

    function loadingBar(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }

    /* run block */
    beforeRun.$inject = ['$rootScope'];

    function beforeRun($rootScope) {
        $rootScope.toggleMenu = function() {
            $('.ilab-menu').toggleClass('open');
        };
    }

    restangular.$inject = ['RestangularProvider'];
    function restangular(RestangularProvider) {
        RestangularProvider.setBaseUrl('/services/api');
        RestangularProvider.setRestangularFields({selfLink: 'self.href'});
        // RestangularProvider.setBaseUrl('http://demo0524551.mockable.io/');
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});
    }

    pagination.$inject = ['paginationTemplateProvider'];
    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }

})();
