(function() {

    angular
        .module('ilabConfig')
        .config(route)
        .config(restangular)
        .config(pagination)
        .run(attachMenu)
        .run(loading)
        .run(init);

    angular
        .module('ilabConfig')
        .constant('DATETIME_FORMAT', 'L');


    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /environment
        $urlRouterProvider.otherwise("/404");
        //
        // Now set up the states
        $stateProvider
            .state('404', {
                url: "/404",
                views: {
                    'page@': {
                        templateUrl: "404.html",
                    }
                }
            })
            .state('default', {
                url: "/",
                templateUrl: "main/welcome/welcome.html",
                controller: 'WelcomeCtrl',
                controllerAs: 'Welcome'
            })
            .state('envs', {
                abstract: true,
                views: {
                    'page@': {
                        templateUrl: 'main/templates/common.tpl.html',
                        controller: function($rootScope) {
                            $rootScope.page.title = "My Environment";
                        }
                    }
                },
                controller: function() {
                    console.log('data');
                },
                breadcrumb: {
                    proxy: 'envs.list'
                }
            })
            .state('envs.list', {
                url: '/environments',
                views: {
                    'content@envs': {
                        templateUrl: "main/environment/envs.html",
                        controller: 'EnvsCtrl',
                        controllerAs: 'Envs'
                    }
                },
                resolve: {
                    _envs: function(environmentService) {
                        return environmentService.getList({expand: 'virtualMachines,physicalMachines,networks,users'});
                    }
                },
                breadcrumb: {
                    name: 'All environments'
                }
            })
            .state('envs.detail', {
                abstract: true,
                url: "/environment/:envId",
                views: {
                    'content@envs': {
                        templateUrl: "main/environment/env.html",
                        controller: 'EnvCtrl',
                        controllerAs: 'Env'
                    }
                },
                resolve: {
                    _env: function(environmentService, $stateParams) {
                        return environmentService.get($stateParams.envId, {expand: 'virtualMachines,physicalMachines'});
                    }
                },
                breadcrumb: {
                    name: false
                }            
            })
            .state('envs.detail.vm', {
                url: "/vm",
                views: {
                    'tab@envs.detail': {
                        templateUrl: "main/environment/vm/vm.html",
                        controller: 'VMCtrl',
                        controllerAs: 'VM'
                    }
                },
                resolve: {
                    _vms: function(_env) {
                        console.log(_env.virtualMachines);
                        return _env.virtualMachines;
                    }
                },
                breadcrumb: {
                    name: '{{_env.name}}'
                }            
            })
            .state('envs.detail.pm', {
                url: "/pm",
                views: {
                    'tab@envs.detail': {
                        templateUrl: "main/environment/pm/pm.html",
                        controller: 'PmCtrl',
                        controllerAs: "Pm"
                    }
                },
                resolve: {
                    _pms: function(_env) {
                        console.log(_env.name);
                        return _env.physicalMachines;
                    }
                },
                breadcrumb: {
                    name: '{{_env.name}}'
                }
            })
            .state('envs.detail.pm.add', {
                url: "/add",
                views: {
                    'content@envs': {
                        template: "<h2>add pm</h2>"
                    }
                },
                resolve: {
                    _pms: function(_env) {
                        console.log(_env.name);
                        return _env.physicalMachines;
                    }
                },
                breadcrumb: {
                    name: 'add pm'
                }
            })
            .state('envs.basic', {
                url: "/environment-basic/:envId",
                views: {
                    'content@envs': {
                        templateUrl: "main/environment/envBasic/envBasic.html",
                        controller: 'EnvCtrl',
                        controllerAs: 'EnvBasic'
                    }
                },
                resolve: {
                    _env: function(environmentService, $stateParams) {
                        return environmentService.get($stateParams.envId, {expand: 'virtualMachines'});
                    }
                },
                breadcrumb: {
                    name: 'Basic View'
                }
            })
            .state('lab', {
                abstract: true,
                url: "/lab",
                views: {
                    'page@': {
                        templateUrl: "main/templates/common.tpl.html",
                        controller: function($rootScope) {
                            $rootScope.page.title = "Lab Workspace";
                        }
                    }
                },
                breadcrumb: {
                    proxy: 'lab.list'
                }
            })
            .state('lab.list', {
                url: "/list",
                views: {
                    'content@lab': {
                        templateUrl: "main/lab/lab.list.html"
                    }
                },
                breadcrumb: {
                    name: 'Lab Workspace'
                }
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
        RestangularProvider.setDefaultHttpFields({cache: true});
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});
    }

    pagination.$inject = ['paginationTemplateProvider'];

    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }

    init.$inject = ['$rootScope'];

    function init($rootScope) {
        $rootScope.page = {
            title: 'default page title'
        };
    }
})();
