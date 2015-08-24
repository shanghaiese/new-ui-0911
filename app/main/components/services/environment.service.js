(function() {

    angular
        .module('ilabService')
        .factory('environmentService', environmentService);

    environmentService.$inject = ['Restangular', 'environmentModel'];

    function environmentService(Restangular, environmentModel) {
    	var environments = Restangular.all('environments');
    	Restangular.extendModel('environments', function(envs) {
    		var o = environmentModel.mixInto(envs);
    		o.getVms = function() {
    			return environments.getList({expand: 'virtualMachines'});
    		};

    		return o;
    	});
    	return environments;
    }

})();
