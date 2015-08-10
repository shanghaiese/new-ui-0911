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
            .state('all-env', {
                url: "/all-env",
                templateUrl: "main/environment/all-environment/all-env.html",
                controller: 'EnvlistCtrl',
                controllerAs: 'Envlist'
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
                controller:'physicalMachineCtrl',
                controllerAs:'physicalMachine'
            })
            .state('vmBasic',{
                url:"/vmBasic",
                templateUrl:"main/environment/vmBasic/vmBasic.html",
                controller:"VMBasicCtrl",
                controllerAs:'vmBasic'
            })
            .state('vm-multi',{
                url:"/vm-multi",
                templateUrl:"main/environment/vm-multi/vm-multi.html",
                controller:"VMMultiCtrl",
                controllerAs:'vmMulti'
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
        RestangularProvider.setBaseUrl('/mockapi');
        RestangularProvider.setRestangularFields({selfLink: 'self.href'});
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});
    }

    pagination.$inject = ['paginationTemplateProvider'];
    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }

})();
