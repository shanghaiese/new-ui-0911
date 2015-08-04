(function(){
    angular.module('ilab')
        .controller('VMCtrl', VMCtrl);

    VMCtrl.$inject = ['environment'];
    function VMCtrl(environment) {
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

        environment.getList().then(function(envs) {
            that.envs = envs;
        });
    }



})();
