(function() {
    angular.module('ilab')
        .controller('VMCtrl', VMCtrl);

    VMCtrl.$inject = ['environmentService', 'vmService'];

    function VMCtrl(environmentService, vmService) {
        var that = this;

        environmentService.getList().then(function(envs) {
            console.log(envs[0]);
            var env = envs[0];
            env.name = "thj3";
            env.put().then(function(newEnv) {
                console.log(newEnv);
            });
        });

    }



})();
