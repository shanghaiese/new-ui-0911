(function() {

    angular.module('ilabConfig')
        .config(function($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /environment
            $urlRouterProvider.otherwise("/default");
            //
            // Now set up the states
            $stateProvider
                .state('default', {
                    url: "/default",
                    templateUrl: "main/environment/environment.html",
                    controller: function($scope) {
                        console.log('environment');
                    }
                })
                .state('environment', {
                    url: "/environment",
                    templateUrl: "main/environment/environment.html",
                    controller: function($scope) {
                        console.log('environment');
                    }
                })
                .state('environment.vms', {
                    url: "/vms",
                    templateUrl: "main/environment/vms/vms.html",
                    controller: 'EnvironmentVMCtrl',
                    controllerAs: 'envVM'
                })
                .state('environment.setting_vms', {
                    url: "/vms_setting",
                    templateUrl: "main/environment/vms/vms_setting.html",
                    controller: 'EnvironmentVMCtrl',
                    controllerAs: "envVM"
                })
                .state('state2', {
                    url: "/state2",
                    templateUrl: "main/state2.html",
                    controller: function() {
                        console.log('state2');
                    }
                })
                .state('state2.list', {
                    url: "/list",
                    templateUrl: "main/state2.list.html",
                    controller: function($scope) {
                        console.log('state2.list');
                        $scope.things = ["A", "Set", "Of", "Things"];
                    }
                });
        });

})();
