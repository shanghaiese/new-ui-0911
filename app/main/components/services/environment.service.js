(function() {

	angular
		.module('ilabService')
		.factory('environmentService', environmentService);

	environmentService.$inject = ['Restangular', 'environmentModel', 'vmModel'];

	function environmentService(Restangular, environmentModel, vmModel) {
		/* config environment requests */
		return Restangular.withConfig(function(config) {
			config.addResponseInterceptor(function(data, operation, what, url, response, deferred) {

				/* when get vms from one env, we should new VM object */
				if (operation === 'get' && response.config.params.expand) {
					if (response.config.params.expand.indexOf('virtualMachines') > -1) {
						data.virtualMachines = Restangular.restangularizeCollection(null, vmModel.mixIntoCollection(data.virtualMachines), 'virtual-machines');
					}
				}
				return data;
			});

		})

			/* mix model in service */
			.extendModel('environments', function(model) {
				return environmentModel.mixInto(model);
			})

			/* return service */
			.service('environments');

	}

})();