(function() {
    angular.module('ilab')
        .controller('PmCtrl', PmCtrl);

    PmCtrl.$inject = ['environmentService', '_env', '$scope'];

    function PmCtrl(environmentService, _env, $scope) {
        var that = this;

        that.pms = _env.physicalMachines;
        $scope.Env.activeTab = 2;
        activate();

        function activate() {
            
        }
    }



})();
