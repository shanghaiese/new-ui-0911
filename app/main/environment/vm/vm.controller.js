(function() {
    angular.module('ilab')
        .controller('VmCtrl', VmCtrl);

    VmCtrl.$inject = ['environmentService', 'vmService', '_vms', '_env', '$scope'];

    function VmCtrl(environmentService, vmService, _vms, _env, $scope) {
        var that = this;

        that.vms = _vms;
        $scope.Env.activeTab = 1;
        activate();

        function activate() {
            console.log(_env);
        }
    }



})();
