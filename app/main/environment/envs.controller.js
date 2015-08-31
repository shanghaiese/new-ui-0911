(function() {

    angular.module('ilab')
        .controller('EnvsCtrl', EnvsCtrl);

    EnvsCtrl.$inject = ['_envs', 'environmentService', '$rootScope', '$state'];

    function EnvsCtrl(_envs, environmentService, $rootScope, $state) {
        var that = this;

        that.envs = _envs;
        that.addEnvCollapsed = true;
        that.addEnv = addEnv;
        that.reset = resetEnv;
        that.toggleAddEnv = toggleAddEnv;
        that.newEnv = {};
        activate();

        function activate() {
            
        }

        function addEnv() {
            environmentService.post(that.newEnv).then(function(data) {
                console.log(data);
                $state.go('envs.basic', {envId: data.id});
            })
        }

        function resetEnv() {
            that.newEnv = {};
            that.addEnvCollapsed = true;
        }
        function toggleAddEnv() {
            that.addEnvCollapsed = !that.addEnvCollapsed;

        }
    }
})();
