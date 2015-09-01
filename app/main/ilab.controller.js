(function() {

	angular.module('ilab')
		.controller('IlabCtrl', IlabCtrl);

	IlabCtrl.$inject = ['$rootScope', 'alert'];
	function IlabCtrl($rootScope, alert) {
		var self = this;

		self.close = closeAlert;
		activate();

		function activate() {
			alert.open({type: 'success', message: 'hello'});
		}
		function closeAlert(id) {
			alert.close(id);
		}
	}
})();