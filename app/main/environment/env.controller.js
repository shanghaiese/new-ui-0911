(function() {

    angular.module('ilab')
        .controller('EnvCtrl', EnvCtrl);

    EnvCtrl.$inject = ['_env', '_envs', '$scope', '$state'];

    function EnvCtrl(_env, _envs, $scope, $state) {
        var self = this;

        self.env = _env;
        self.envs = _envs;
        self.activeTab = 1;

        activate();

        function activate() {
        }
        $scope.$watch(function() {
        	return self.env;
        }, function(newV, oldV) {
            if (newV !== oldV) {
                console.log(newV);
                $state.go($state.current.name, {
                    envId: newV.id
                });
            }
        });
    }
})();
