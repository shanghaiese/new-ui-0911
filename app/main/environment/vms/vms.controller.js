(function() {

	angular
		.module('ilab')
		.controller('EnvironmentVMCtrl', EnvironmentVMCtrl);
		
	EnvironmentVMCtrl.$inject = ['$scope'];

	function EnvironmentVMCtrl($scope) {
		$scope.larr = [{name: 'a'},{name: 'b'}];
  		$scope.model=false;
  		console.log('f');

  		$scope.configTmp = {
  			"name": testVM
  		}
	}

})();
