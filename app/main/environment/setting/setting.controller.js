(function() {

	angular.module('ilab')
		.controller('EnvSettingCtrl', EnvSettingCtrl);

	EnvSettingCtrl.$inject = ['_env', 'environmentService', 'alert', '$state', 'vmService'];

	function EnvSettingCtrl(_env, environmentService, alert, $state, vmService) {
		var self = this;

		self.tmpEnv = {};
		self.updateEnv = updateEnv;
		self.resetEnv = resetEnv;
		self.deleteEnv = deleteEnv;
		activate();

		function activate() {
			angular.copy(_env, self.tmpEnv);
			_env.expand('virtualMachines', 'physicalMachines').then(function(data) {
				console.log('here', data.virtualMachines);
			});
			console.log(environmentService);
			environmentService.getList().then(function(envs) {
				console.log(envs);
			});

			self.tmpEnv.expiryDate = new Date(self.tmpEnv.expiryDate);
		}

		function updateEnv() {
			angular.extend(_env, self.tmpEnv);
			console.log(_env.expiryDate.toISOString());
			_env.expire_date = _env.expiryDate.toISOString();
			_env.put().then(function(data) {
				alert.open({type: 'success', message: 'update success'});
			}, function(error) {
				alert.open({type: 'danger', message: error});
			});
		}

		function resetEnv() {
			angular.copy(_env, self.tmpEnv);
		}
		function deleteEnv() {
			_env.remove().then(function(data) {
				$state.go('envs.list');
			});
		}
	}
})();