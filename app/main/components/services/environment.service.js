(function() {

    angular
        .module('ilabService')
        .factory('environmentService', environmentService);

    environmentService.$inject = ['Restangular', 'environmentModel', 'vmModel'];

    function environmentService(Restangular, environmentModel, vmModel) {
    	var environments = Restangular.all('environments');
    	Restangular.extendModel('environments', function(model) {
    		var modelApi = {
    			expand: function() {
    				var args = Array.prototype.slice.call(arguments);
    				return environments.get(this.id, {expand: args.join(',')}).then(function(env) {
	    				if(args.indexOf('virtualMachines') > -1) {
		    				env.virtualMachines = vmModel.mixIntoCollection(Restangular.restangularizeCollection(null, env.virtualMachines, 'virtual-machines'));
	    				}
	    				if(args.indexOf('physicalMachines') > -1) {
		    				env.physicalMachines = vmModel.mixIntoCollection(Restangular.restangularizeCollection(null, env.physicalMachines, 'physical-machines'));
	    				}
	    				return env;
    				});
    			}
    		};

    		return angular.extend(environmentModel.mixInto(model), modelApi);
    	});
    	return environments;
    }

})();
