(function() {

	angular.module('ilab')
		.controller('EnvSettingCtrl', EnvSettingCtrl);

	EnvSettingCtrl.$inject = ['_env', 'environmentService', 'alert'];

	function EnvSettingCtrl(_env, environmentService, alert) {
		var self = this;

		self.tmpEnv = {};
		self.updateEnv = updateEnv;
		self.resetEnv = resetEnv;
		activate();

		function activate() {
			angular.copy(_env, self.tmpEnv);
			console.log(self.tmpEnv);
		}

		function updateEnv() {
			angular.extend(_env, self.tmpEnv);
			console.log(_env.expiryDate.toISOString());
			_env.expiryDate = _env.expiryDate.toISOString();
			_env.put().then(function(data) {
				console.log(data);
				alert.open({type: 'success', message: 'update success'});
			});
		}

		function resetEnv() {
			angular.copy(_env, self.tmpEnv);
			console.log(self.tmpEnv);
		}
	}
})();