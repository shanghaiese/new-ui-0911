(function() {

    angular
        .module('ilabConfig')
        .constant('API_PREFIX', 'http://10.223.136.7/services/api/')
        .config(route)
        .config(restangular)
        .config(pagination)
        .run(attachMenu)
        .run(loading);

    angular
        .module('ilabConfig')
        .constant('DATETIME_FORMAT', 'L');


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
            .state('editEnv', {
                url: "/editEnv",
                templateUrl: "main/environment/editEnv/editEnv.html",
                controller: 'editEnvCtrl',
                controllerAs: 'editEnv'
            })

            .state('env', {
                url: "/environment/:envId",
                templateUrl: "main/environment/env.html",
                controller: 'EnvCtrl',
                controllerAs: 'Env',
                resolve: {
                    _env: function(environmentService, $stateParams) {
                        return environmentService.get($stateParams.envId, {expand: 'virtualMachines'});
                    }
                }
            })
            .state('env.vm', {
                url: "/vm",
                templateUrl: "main/environment/vm/vm.html",
                controller: 'VmCtrl',
                controllerAs: 'Vm',
                resolve: {
                    _vms: function(_env) {
                        return _env.virtualMachines;
                    }
                }
            })
            .state('env.pm', {
                url: "/pm",
                templateUrl: "main/environment/pm/pm.html",
                controller: 'PmCtrl',
                controllerAs: "Pm"
            })
         .state('envBasic', {
                url: "/environment-basic/:envId",
                templateUrl: "main/environment/envBasic/envBasic.html",
                controller: 'EnvBasicCtrl',
                controllerAs: 'EnvBasic',
                resolve: {
                    _env: function(environmentService, $stateParams) {
                        return environmentService.get($stateParams.envId, {expand: 'virtualMachines'});
                    }
                }
            })
            .state('envs', {
                url: '/environments',
                templateUrl: "main/environment/envs.html",
                controller: 'EnvsCtrl',
                controllerAs: 'Envs',
                resolve: {
                    _envs: function(environmentService) {
                        return environmentService.getList({expand: 'virtualMachines,physicalMachines,networks,users,summary'});
                    }
                }
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
    attachMenu.$inject = ['$rootScope'];

    function attachMenu($rootScope) {
        $rootScope.toggleMenu = function() {
            $('.ilab-menu').toggleClass('open');
        };
    }

    loading.$inject = ['$rootScope'];

    function loading($rootScope) {
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            $rootScope.isLoading = false;
            if(toState && toState.resolve) {
                $rootScope.isLoading = true;
            }
        });
        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $rootScope.isLoading = false;
            
        });
        $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
            $rootScope.isLoading = false;
           
        });
    }

    restangular.$inject = ['RestangularProvider'];

    function restangular(RestangularProvider) {
        RestangularProvider.setBaseUrl('/services/api/');
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});
    }

    pagination.$inject = ['paginationTemplateProvider'];

    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }

})();
