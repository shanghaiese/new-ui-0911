(function() {

    angular.module('ilabConfig')
        .config(function($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("/state1");
            //
            // Now set up the states
            // hello
            $stateProvider
                .state('state1', {
                    url: "/state1",
                    templateUrl: "main/state1.html",
                    controller: function($scope) {
                        console.log('state1');
                    }
                })
                .state('state1.tab1', {
                    url: "/tab1",
                    templateUrl: "main/state1.tab1.html",
                    controller: function($scope) {
                        console.log('state1.tab1');
                        $scope.items = ["A", "List", "Of", "Items"];
                    }
                })
                .state('state1.tab2', {
                    url: "/tab2",
                    templateUrl: "main/state1.tab2.html",
                    controller: function($scope) {
                        console.log('state1.tab2');
                        $scope.items = ["A", "List", "Of", "Items"];
                    }
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
