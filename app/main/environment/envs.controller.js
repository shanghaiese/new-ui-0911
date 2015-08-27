(function() {

    angular.module('ilab')
        .controller('EnvsCtrl', EnvsCtrl);

    EnvsCtrl.$inject = ['_envs', 'environmentService', '$rootScope'];

    function EnvsCtrl(_envs, environmentService, $rootScope) {
        var that = this;

        that.envs = _envs;
        activate();

        function activate() {
            console.log($rootScope.page);
        }
    }
})();
