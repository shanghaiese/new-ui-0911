(function() {
    angular
        .module('ilab')
        .controller('envBasicCtrl',  envBasicCtrl);

    envBasicCtrl.$inject = ['machine','Restangular'];

    function envBasicCtrl(machine,Restangular){
        var that = this;
        that.vms = [];
        that.inOperation = [];
        
        that.connect = connect;
        that.power = power;

        //init functions
        activate();
        function activate() {
            loadVMList();
        }

        function loadVMList() {
            machine.getVMDetail().then(function(data){
                that.vms = data;
                function notDeleteVM(vm){
                    return vm.disable !== 3;
                }
                var filtered = that.vms.filter(notDeleteVM);
                //console.log(filtered);
                that.vmCount = filtered.length;
            });
        }

        //virtual machines to get console
        function connect(vmId) {
            console.log(vmId);
        }

        function vmIsInOperation(vmId) {
            that.isInOperation = false;
                angular.forEach(that.inOperation, function(item, index) {
                    if (item == vmId) {
                        that.isInOperation = true;
                    }
                });
                return that.isInOperation;
        }

        function power(op, vmId) {
                that.isShown = false;
                //console.log(1);
                var vm = Restangular.one("virtual-machines",vmId).get();
                console.log(vm);
                if (op === 'powerOn' && vm.power !== 1) {
                    that.isInOperation.push(vmId);
                    vm.then(function(vmPower){
                        that.inOperation.splice(that.inOperation.indexOf(vmId));
                        vmPower.post("powerOn",vmId);
                    });
                } else if (op === 'powerOff' && vm.power !== 0) {
                    that.isInOperation.push(vmId);
                    vm.then(function(vmPower){
                        that.inOperation.splice(that.inOperation.indexOf(vmId));
                        vmPower.post("powerOff",vmId);
                    });
                } else if (op === 'suspend' && vm.power !== 0) {
                    that.isInOperation.push(vmId);
                    vm.then(function(vmPower){
                        that.inOperation.splice(that.inOperation.indexOf(vmId));
                        vmPower.post("powerPause",vmId);
                    });
                } else if (op === 'restart' && vm.power !== 0 && vm.power !== 2) {
                    that.isInOperation.push(vmId);
                    vm.then(function(vmPower){
                        that.inOperation.splice(that.inOperation.indexOf(vmId));
                        vmPower.post("powerReset",vmId);
                    });
                } 
            }
        }
        

    })();