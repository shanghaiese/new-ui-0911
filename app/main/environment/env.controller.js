(function() {

    angular.module('ilab')
        .controller('EnvCtrl', EnvCtrl);

    EnvCtrl.$inject = ['_env', '_envs', '$scope', '$state', 'machine'];

    function EnvCtrl(_env, _envs, $scope, $state, machine) {
        var self = this;

        self.env = _env;
        self.envs = _envs;
        self.vmBuckets = [];
        self.activeTab = 1;
        self.power = power;
        self.runningVm = [];

        var bucketSize = 5;
        activate();

        function activate() {
            attachStatusToVm(self.env.virtualMachines);
            self.vmBuckets = splitIntoBuckets(self.env.virtualMachines, bucketSize);
            console.log(self.vmBuckets);
        }
        $scope.$watch(function() {
            return self.env;
        }, function(newV, oldV) {
            if (newV !== oldV) {
                console.log(newV);
                $state.go($state.current.name, {
                    envId: newV.id
                });
            }
        });

        function attachStatusToVm(vms) {
            angular.forEach(vms, function(each) {
                if (each.isDisabled) {
                    each.status = 'Disabled';
                } else if (each.power === 0) {
                    each.status = 'Stopped';
                } else if (each.power === 1) {
                    each.status = 'Running';
                } else if (each.power === 2) {
                    each.status = 'Suspended';
                }
            });
        }

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
            self.runningVm.push(vm.id);
            var vmToPower = machine.getOneVmForOperation(vm.id);
            console.log(vmToPower);
            if (option === 'powerOn') {
                vmToPower.post('powerOn').then(function(data) {
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.status = 'Running';
                });
            } else if (option === 'powerOff') {
                vmToPower.post('powerOff').then(function(data) {
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.status = 'Stopped';
                });
            } else if (option === 'restart') {
                vmToPower.post('powerReset').then(function(data) {
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.status = 'Running';
                });
            } else {
                vmToPower.post('powerPause').then(function(data){
                    self.runningVm.splice(self.runningVm.indexOf(vm.id), 1);
                    vm.status = 'Suspended';
                });
            }
        }
    }
})();
