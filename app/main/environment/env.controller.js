(function() {

    angular.module('ilab')
        .controller('EnvCtrl', EnvCtrl);

    EnvCtrl.$inject = ['_env', '_envs', '$scope', '$state', 'machine'];

    function EnvCtrl(_env, _envs, $scope, $state, machine) {
        var self = this;

        
        self.vmBuckets = [];
        self.activeTab = 1;
        self.power = power;
        self.runningVm = [];

        var bucketSize = 12;
        activate();

        function activate() {
            self.env = _env;
            self.envs = _envs;
            // attachStatusToVm(self.env.virtualMachines);
            self.vmBuckets = splitIntoBuckets(self.env.virtualMachines, bucketSize);

        }
        $scope.$watch(function() {
            return self.env;
        }, function(newV, oldV) {
            if (newV !== oldV) {
                //console.log(newV);
                $state.go($state.current.name, {
                    envId: newV.id
                });
            }
        });

        // function attachStatusToVm(vms) {
        //     angular.forEach(vms, function(each) {
        //         if (each.isDisabled) {
        //             each.status = 'Disabled';
        //         } else if (each.powerStatus === 'OFF') {
        //             each.status = 'Stopped';
        //         } else if (each.powerStatus === 'ON') {
        //             each.status = 'Running';
        //         } else if (each.powerStatus === 'PAUSED') {
        //             each.status = 'Suspended';
        //         }
        //     });
        // }

        function splitIntoBuckets(vms, bucketSize) {
            var buckets = [];
            if(bucketSize <= 0 || !angular.isNumber(bucketSize) || Math.floor(bucketSize) !== bucketSize) {
                return;
            }
            for(var i=0; i<vms.length/bucketSize; ++i) {
                buckets.push(vms.slice(i * bucketSize, i * bucketSize + bucketSize));
            }
            return buckets;
        }

        function power(vm, option) {
            console.log(vm);
            self.runningVm.push(vm.id);
            var vmToPower = machine.getOneVmForOperation(vm.id);
            if (option === 'powerOn') {
                vmToPower.post('powerOn').then(function(data) {
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);                 
                    vm.powerStatus = data.powerStatus;
                    if (data.powerStatus === 'ON') {
                        vm.power_ = 'RUNNING';
                    };
                    
                });
            } else if (option === 'powerOff') {
                vmToPower.post('powerOff').then(function(data) {
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.powerStatus = data.powerStatus;
                    if (data.powerStatus === 'OFF') {
                        vm.power_ = 'STOPPED';
                    };
                });
            } else if (option === 'restart') {
                vmToPower.post('powerReset').then(function(data) {
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.powerStatus = data.powerStatus;
                    if (data.powerStatus === 'ON') {
                        vm.power_ = 'RUNNING';
                    };
                });
            } else if (option === 'suspend'){
                vmToPower.post('powerPause').then(function(data){
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.powerStatus = data.powerStatus;
                    if (data.powerStatus === 'PAUSED') {
                        vm.power_ = 'SUSPENDED';
                    };
                });
            }
        }
    }
})();
