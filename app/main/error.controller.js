(function() {

	angular.module('ilab')
		.controller('ErrorCtrl', ErrorCtrl);

	ErrorCtrl.$inject = ['_error', '$state'];

	function ErrorCtrl(_error, $state) {
		var self = this;

		self.error = _error;
	}
})();