(function() {
    angular.module('ilab')
        .controller('PmCtrl', PmCtrl);

    PmCtrl.$inject = ['environmentService', '_env', '$scope'];

    function PmCtrl(environmentService, _env, $scope) {
        var that = this;

        that.pms = _env.physicalMachines; 
        that.collapsed = null; // pm id that is collapsed
        that.collapse = collapse;
        that.columns = [{display:'Name'}, {display:'IP'}, {display:'Reservation'}, {display:'Connect'}, {display:'Power'}];
        $scope.Env.activeTab = 2;
        activate();

        function activate() {
            
        }

        function collapse(pm) {
            if(that.collapsed === pm.id) {
                that.collapsed = null;
            }else {
                that.collapsed = pm.id;
            }
        }
    }



})();
