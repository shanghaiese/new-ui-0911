(function() {
    angular.module('ilab')
        .controller('VMCtrl', VMCtrl);

    VMCtrl.$inject = ['environment', 'vm', '_envs'];

    function VMCtrl(environment, vm, _envs) {
        var that = this;
        that.item = 1;

        that.check = function(item) {
            if (item === 1) {
                return true;
            } else {
                return false;
            }
            if (item === 1) {
                return true;
            } else {
                return false;
            }
        };

        that.envs = _envs;
        vm.get(that.envs[0].virtualMachines[0].id).then(function(data) {
            console.log(data);
        });

    }



})();
