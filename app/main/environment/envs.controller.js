(function() {

    angular.module('ilab')
        .controller('EnvsCtrl', EnvsCtrl);

    EnvsCtrl.$inject = ['_envs', 'environmentService'];

    function EnvsCtrl(_envs, environmentService) {
        var that = this;

        that.envs = _envs;
        activate();

        function activate() {
        }
    }
})();
