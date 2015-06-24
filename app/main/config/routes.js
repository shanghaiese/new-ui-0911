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
                    controller: VMsCtrl
                    // controller: function($scope) {
                    //     console.log('environment.vms');
                    // }
                })
                // .state('environment.tab2', {
                //     url: "/tab2",
                //     templateUrl: "main/environment.tab2.html",
                //     controller: function($scope) {
                //         console.log('environment.tab2');
                //         $scope.items = ["B", "List", "Of", "Items"];
                //     }
                // })
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
