(function() {

    angular.module('ilab')
        .controller('EnvCtrl', EnvCtrl);

    EnvCtrl.$inject = ['_env', '_envs', '$scope', '$state', 'machine'];

    function EnvCtrl(_env, _envs, $scope, $state, machine) {
        var self = this;

        self.env = _env;
        self.envs = _envs;
        self.activeTab = 1;
        self.power = power;
        self.runningVm = [];
        activate();

        function activate() {
            attachStatusToVm(self.env.virtualMachines);
            if(self.env.virtualMachines.length < 12){
                self.vms = self.env.virtualMachines;
            }
            if(self.env.virtualMachines.length > 12){
                self.vmsInBuckets = paging(self.env.virtualMachines,12);
            }
        }
        //watch onchange of an env
        $scope.$watch(function() {
            return self.env;
        }, function(newV, oldV) {
            if (newV !== oldV) {
                $state.go($state.current.name, {
                    envId: newV.id
                });
            }
        });

        function attachStatusToVm(vms) {
            angular.forEach(vms, function(each) {
                if (each.disable) {
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

        function power(vm, option) {
            self.runningVm.push(vm.id);
            var vmToPower = machine.getOneVmForOperation(vm.id);
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

        function paging(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
    }
})();
