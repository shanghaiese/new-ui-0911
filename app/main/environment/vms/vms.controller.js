(function() {

	angular
		.module('ilab')
		.controller('EnvironmentVMCtrl', EnvironmentVMCtrl);
		
	EnvironmentVMCtrl.$inject = ['$scope', 'machine'];

	function EnvironmentVMCtrl($scope, machine) {
		$scope.CPU = [];
		$scope.Memory = [];
		$scope.Network = [];
		$scope.configTmp = {};
		$scope.cancelConfig = cancelConfig;
		$scope.submit = submit;

  		$scope.CPU = [{id: 0, NumOfCPU: "1" }, 
  						{id: 1, NumOfCPU: "2" }, 
  						{id: 2, NumOfCPU: "4" }, 
  						{id: 3, NumOfCPU: "8" }, 
  						{id: 4, NumOfCPU: "16" }];

  		$scope.Memory = [
  						[{memory: "0.5"}, {memory: "1"}, {memory: "2"}, {memory: "4"}],
  						[{memory: "2"}, {memory: "4"}, {memory: "8"}],
  						[{memory: "4"}, {memory: "8"}, {memory: "16"}],
  						[{memory: "8"}, {memory: "16"}],
  						[{memory: "16"}, {memory: "32"}]
  		];

  		$scope.Network = [{Nic: "Nic1"}, {Nic: "Nic2"}];

  		$scope.configTmp = {
  			name: "testVM",
  			description: "This is a test VM",
  			CPU: "",
  			Memory: "",
  			Network: ""
  		}

  		function cancelConfig() {
            $scope.configTmp.name = "";
            $scope.configTmp.description = "";
            $scope.configTmp.Memory = "None";
            $scope.configTmp.CPU = "None";
            $scope.configTmp.Network = "None";
            console.log("cancelConfig");
        }
  		
        function submit() {
        	alert('Submit Success');
        }


	}

})();
