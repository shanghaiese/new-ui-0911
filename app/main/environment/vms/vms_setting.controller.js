(function() {
    angular
		.module('ilab')
		.controller('EnvironmentVMCtrl', EnvironmentVMCtrl);
		
    EnvironmentVMCtrl.$inject = ['$scope'];

    function EnvironmentVMCtrl($scope) {
        var that = this;
		    that.CPU = [];
		    that.Memory = [];
		    that.Network = [];
		    that.configTmp = {};
		    that.cancelConfig = cancelConfig;
		    that.submit = submit;

        that.CPU = [{id: 0, NumOfCPU: "1" }, 
                    {id: 1, NumOfCPU: "2" }, 
                    {id: 2, NumOfCPU: "4" }, 
 					{id: 3, NumOfCPU: "8" }, 
 					{id: 4, NumOfCPU: "16" }];

        that.Memory = [
                      [{memory: "0.5"}, {memory: "1"}, {memory: "2"}, {memory: "4"}],
 					  [{memory: "2"}, {memory: "4"}, {memory: "8"}],
 					  [{memory: "4"}, {memory: "8"}, {memory: "16"}],
 					  [{memory: "8"}, {memory: "16"}],
 					  [{memory: "16"}, {memory: "32"}]
                      ];

        that.Network = [{Nic: "Nic1"}, {Nic: "Nic2"}];

        that.configTmp = {
 			name: "testVM",
 			description: "This is a test VM",
 			CPU: "",
 			memory: "",
 			Network: ""
        };

        function cancelConfig() {
            that.configTmp.name = "";
            that.configTmp.description = "";
            that.configTmp.Memory = "None";
            that.configTmp.CPU = "None";
            that.configTmp.Network = "None";
            console.log("cancelConfig");
        }
        function submit() {
            alert('Submit Success');
        }
    }
})();