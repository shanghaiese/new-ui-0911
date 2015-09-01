(function() {

	angular.module('ilab')
		.controller('EnvSettingCtrl', EnvSettingCtrl);

	EnvSettingCtrl.$inject = ['_env', 'environmentService', 'alert', '$state'];

	function EnvSettingCtrl(_env, environmentService, alert, $state) {
		var self = this;

		self.tmpEnv = {};
		self.updateEnv = updateEnv;
		self.resetEnv = resetEnv;
		self.deleteEnv = deleteEnv;
		activate();

		function activate() {
			angular.copy(_env, self.tmpEnv);
			console.log(self.tmpEnv);

			self.tmpEnv.expiryDate = new Date(self.tmpEnv.expiryDate);
			console.log(self.tmpEnv);
		}

		function updateEnv() {
			angular.extend(_env, self.tmpEnv);
			console.log(_env.expiryDate.toISOString());
			_env.expire_date = _env.expiryDate.toISOString();
			_env.put().then(function(data) {
				console.log(data);
				alert.open({type: 'success', message: 'update success'});
			}, function(error) {
				alert.open({type: 'danger', message: error})
			});
		}

		function resetEnv() {
			angular.copy(_env, self.tmpEnv);
			console.log(self.tmpEnv);
		}
		function deleteEnv() {
			_env.remove().then(function(data) {
				console.log('removed');
				$state.go('envs.list');
			});
		}
	}
})();