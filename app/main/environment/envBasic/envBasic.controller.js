(function() {
    angular
        .module('ilab')
        .controller('envBasicCtrl',  envBasicCtrl);

    envBasicCtrl.$inject = ['machine'];

    function envBasicCtrl(machine){
        var that = this;
        that.vms = [];
        that.isInOperation = false;
        
        that.connect = connect;
        that.powerOperation = powerOperation;

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
                console.log(filtered);
                that.vmCount = filtered.length;
            });
        }

        //virtual machines to get console
        function connect(vmId) {
           
        }

        function powerOperation(op, vmId) {
                var vm = Restangular.one("virtual-machines",vmId).get();
                if (op === 'powerOn' && that.vms.power !== 1) {
                    that.isInOperation = true;
                    that.isShown = false;
                    vm.then(function(vmPower){
                        vmPower.post("powerOn",vmId);
                        
                    });
                } else if (op === 'powerOff' && that.vms.power !== 0) {
                    that.isInOperation = true;
                    that.isShown = false;
                    vm.then(function(vmPower){
                        vmPower.post("powerOff",vmId);
                    });
                } else if (op === 'restart' && that.vms.power !== 0) {
                    that.isInOperation = true;
                    that.isShown = false;
                    vm.then(function(vmPower){
                        vmPower.post("powerReset",vmId);
                    });
                } else if (op === 'suspend' && that.vms.power !== 0 && that.vms.power !== 2) {
                    that.isInOperation = true;
                    that.isShown = false;
                    vm.then(function(vmPower){
                        vmPower.post("powerPause",vmId);
                    });
                } 
            }
        }
        

    })();