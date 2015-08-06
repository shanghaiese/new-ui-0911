
(function(){
    angular.module('ilab')
        .controller('physicalMachineCtrl', physicalMachineCtrl);

    physicalMachineCtrl.$inject = ['environment'];
    function physicalMachineCtrl(environment) {
        var that = this;
        

        environment.getList().then(function(envs) {
            that.envs = envs;
        });
    }



})();