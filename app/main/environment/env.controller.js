(function() {

	angular.module('ilab')
		.controller('EnvCtrl', EnvCtrl);

	EnvCtrl.$inject = ['_env'];
	function EnvCtrl(_env) {
		var that = this;
		that.activeTab = 1;
	
	}
})();