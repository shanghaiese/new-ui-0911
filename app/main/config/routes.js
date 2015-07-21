(function() {

    angular.module('ilabConfig')
        .config(function($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /environment
            $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            $stateProvider
                .state('default', {
                    url: "/",
                    templateUrl: "main/welcome.html",
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
                .state('environment.pms', {
                    url: "/pms",
                    templateUrl: "main/environment/pms/pms.html",
                    controller: function($scope) {
                        console.log('environment.tab2');
                        $scope.items = ["B", "List", "Of", "Items"];
                    }
                })
                .state('vmBasic',{
                    url:"/vmBasic",
                    templateUrl:"main/environment/vmBasic/vmBasic.html",
                    controller:"VMBasicCtrl",
                    controllerAs:'vmd',
                    reslove: {
                        vmDetaildata: function(vmData){
                            return vmData.ofEnvInGroup();
                        }
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
