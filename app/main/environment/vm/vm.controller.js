(function() {
    angular.module('ilab')
        .controller('VMCtrl', VMCtrl);

    VMCtrl.$inject = ['environment', 'vm', 'data'];

    function VMCtrl(environment, vm, data) {
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

        console.log(data);
        that.envs = data;
        vm.get(that.envs[0].virtualMachines[0].id).then(function(data1) {
            console.log(data1);
        });

    }



})();
