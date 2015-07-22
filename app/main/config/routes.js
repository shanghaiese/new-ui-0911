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
                        $scope.lists = [
                            {name: 'a'},
                            {name: 'b'},
                            {name: 'c'},
                        ];
                        $scope.selected = $scope.lists[0];
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
                    controller: 'VMsCtrl',
                    controllerAs: 'vm'
                })
                .state('environment.setting_vms', {
                    url: "/vms_setting",
                    templateUrl: "main/environment/vms/vms_setting.html",
                    controller: 'VMsCtrl',
                    controllerAs: "vm"
                })
                .state('environment.pms', {
                    url: "/pms",
                    templateUrl: "main/environment/pms/pms.html",
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
        });

})();
