(function() {

    angular
        .module('ilabConfig')
        .constant('API_PREFIX', 'http://10.223.136.7/services/api/')
        .config(route)
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
            .state('allEnv', {
                url: "/allEnv",
                templateUrl: "main/environment/allEnvironment/allEnv.html",
                controller: 'EnvlistCtrl',
                controllerAs: 'Envlist'
            })
            .state('env', {
                url: "/environment/:envId",
                templateUrl: "main/environment/env.html"
            })
            .state('env.vm', {
                url: "/vm",
                templateUrl: "main/environment/vm/vm.html",
                controller: 'VMCtrl',
                controllerAs: 'VM'
            })
            .state('env.pm', {
                url: "/pm",
                templateUrl: "main/environment/pm/pm.html"
            })
            .state('envBasicView', {
                url: "/envBasicView/:envId",
                templateUrl: "main/environment/envBasicView/envBasicView.html",
                controller: "envBasicCtrl",
                controllerAs: 'envBasic'
            })
            .state('envs', {
                url: '/environments',
                templateUrl: "main/environment/envs.html"
            })
            .state('lab', {
                url: "/lab",
                templateUrl: "main/lab/lab.html"
            })
            .state('lab.list', {
                url: "/list",
                templateUrl: "main/lab/lab.list.html"
            });
    }

    /* config block */

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
        RestangularProvider.setRestangularFields({
            selfLink: 'self.href'
        });
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});
    }

    pagination.$inject = ['paginationTemplateProvider'];

    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }

})();
