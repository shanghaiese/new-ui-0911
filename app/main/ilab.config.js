(function() {

    angular
        .module('ilabConfig')
        .config(route)
        .config(restangular)
        .config(pagination)
        .run(attachMenu)
        .run(loading);


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
            .state('env', {
                url: "/environment/:envId",
                templateUrl: "main/environment/env.html"
            })
            .state('env.vm', {
                url: "/vm",
                templateUrl: "main/environment/vm/vm.html",
                controller: 'VMCtrl',
                controllerAs: 'VM',
                resolve: {
                    _vms: function(machine) {
                        return machine.getVMList();
                    }
                }
            })
            .state('env.pm', {
                url: "/pm",
                templateUrl: "main/environment/pm/pm.html"
            })
            .state('envBasic', {
                url: "/environment-basic/:envId",
                templateUrl: "main/environment/envBasic/envBasic.html",
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
        RestangularProvider.setParentless(true);
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});
    }

    pagination.$inject = ['paginationTemplateProvider'];

    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }

})();
