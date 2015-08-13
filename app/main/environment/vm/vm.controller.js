(function(){
    angular.module('ilab')
        .controller('VMCtrl', VMCtrl);

    VMCtrl.$inject = ['environment', 'vm'];
    function VMCtrl(environment, vm) {
        var that = this;
        that.item = 1;

        that.check = function(item) {
        	if(item === 1) {
        		return true;
        	}else {
        		return false;
        	}
        	if(item === 1) {
        		return true;
        	}else {
        		return false;
        	}
        };

        console.log(environment.get('2067601'));
        environment.getList({expand: 'virtualMachines'}).then(function(envs) {
            that.envs = envs;
            vm.get(envs[0].virtualMachines[0].id).then(function(data) {
                console.log(data);
            });
        });
    }



})();
