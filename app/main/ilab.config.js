(function() {

    angular
        .module('ilabConfig')
        .config(route)
        .config(restangular)
        .config(pagination)
        .run(attachMenu)
        .run(loading)
        .run(init)
        .constant('DATETIME_FORMAT', 'L');

    /* config starts */
    route.$inject = ['$stateProvider', '$urlRouterProvider'];

    function route($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /environment
        $urlRouterProvider.otherwise("/oops");
        //
        // Now set up the states
        $stateProvider
            .state('error', {
                url: "/oops",
                views: {
                    'page@': {
                        templateUrl: "main/templates/error.html",
                        controller: 'ErrorCtrl',
                        controllerAs: 'Error',
                    }
                },
                resolve: {
                    _error: function() {
                        return this.self.error;
                    }
                }
            })
            .state('default', {
                url: "/",
                views: {
                    'page@': {
                        templateUrl: "main/welcome/welcome.html",
                        controller: 'WelcomeCtrl',
                        controllerAs: 'Welcome'
                    }
                }
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
                resolve: {
                    _envs: function(environmentService) {
                        return environmentService.getList({
                            expand: 'summary'
                        });
                    }
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
                    _envs: function(_envs) {
                        return _envs;
                    }
                },
                breadcrumb: {
                    name: 'All environments'
                }
            })
            .state('envs.detail', {
                // abstract: true,
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
                        return environmentService.one($stateParams.envId).get({expand: 'virtualMachines,networks,physicalMachines'});
                    }
                },
                breadcrumb: {
                    name: '{{_env.name}}'
                }
            })
            .state('envs.detail.vm', {
                url: "/vm",
                views: {
                    'tab@envs.detail': {
                        templateUrl: "main/environment/vm/vm.html",
                        controller: 'VmCtrl',
                        controllerAs: 'Vm'
                    }
                },
                resolve: {
                    _vms: function(_env) {
                        console.log( _env );
                        return _env.virtualMachines;
                    }
                },
                breadcrumb: {
                    name: 'Virtual Machines'
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
                    name: 'Physical Machines'
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
            .state('envs.detail.basic', {
                url: "/overview",
                views: {
                    'content@envs': {
                        templateUrl: "main/environment/envBasic/envBasic.html",
                        controller: 'EnvCtrl',
                        controllerAs: 'EnvBasic'
                    }
                },
                resolve: {
                    _env: function(_env) {
                        return _env;
                    }
                },
                breadcrumb: {
                    name: 'Basic View'
                }
            })
            .state('envs.detail.setting', {
                url: "/setting",
                views: {
                    'content@envs': {
                        templateUrl: "main/environment/setting/setting.html",
                        controller: 'EnvSettingCtrl',
                        controllerAs: 'EnvSetting'
                    }
                },
                // add _env dependency explicitly to enable loading animation.
                resolve: {
                    _env: function(_env) {
                        return _env;
                    }
                },
                breadcrumb: {
                    name: 'Environment Settings'
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

    restangular.$inject = ['RestangularProvider'];

    function restangular(RestangularProvider) {
        RestangularProvider.setBaseUrl('/services/api/');
        RestangularProvider.setDefaultHttpFields({
            cache: true
        });
        // RestangularProvider.setDefaultHttpFields({'withCredentials': true});

        /* detach and transform obj when firing update requests */
        RestangularProvider.addRequestInterceptor(function(element, op, what, url) {
            if (op === "put" && element.toDataTransferObject) {
                element.toDataTransferObject();
            }
            return element;
        });

        /* attach and transform obj right after being restangularized */
        RestangularProvider.setOnElemRestangularized(function(element, isCollection, what, Restangular) {
            if (element.toBusinessObject) {
                element.toBusinessObject();
            }
            return element;
        });
    }

    pagination.$inject = ['paginationTemplateProvider'];

    function pagination(paginationTemplateProvider) {
        paginationTemplateProvider.setPath('main/templates/pagination.tpl.html');
    }


    /* run block starts */
    attachMenu.$inject = ['$rootScope'];

    function attachMenu($rootScope) {
        $rootScope.toggleMenu = function() {
            $('.ilab-menu').toggleClass('open');
        };
    }

    loading.$inject = ['$rootScope', '$state'];

    function loading($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            $rootScope.isLoading = false;
            if (toState && toState.resolve) {
                $rootScope.isLoading = true;
            }
        });
        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $rootScope.isLoading = false;

        });

        /* handle state change error, won't deal with erors happen in controller*/
        $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
            $rootScope.isLoading = false;
            e.preventDefault();
            $state.get('error').error = error;
            $state.go('error');
        });
    }

    init.$inject = ['$rootScope', '$state'];

    function init($rootScope, $state) {
        /* set default title for every page */
        $rootScope.page = {
            title: 'default page title'
        };

        /* direct to vm when user try to go to envs.detail */
        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams) {
            if (toState.name === 'envs.detail') {
                $state.go('envs.detail.vm', toParams);
            }
        });
    }
})();