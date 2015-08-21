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
            });
            
            //console.log(that.vmsmachine.getVMDetail().$object);
            //that.vmCount = that.vms.length;
        }

        function connect(vmId) {
        }

        function powerOperation(vmId, op) {
                var vm_tmp = machine.getVMDetail(vmId);
                console.log(vm_tmp);
                if (op === 'powerOn' && vm_tmp.power !== 1) {
                    that.isInOperation = true;
                    machine.post("powerOn",vmId).then(function() {
                        
                    });
                } else if (op === 'powerOff' && vm_tmp.power !== 0) {
                    that.isInOperation = true;
                    machine.post("powerOff",vmId).then(function() {
                        
                    });
                } else if (op === 'restart' && vm_tmp.power !== 0) {
                    that.isInOperation = true;
                    machine.post("suspend",vmId).then(function() {
                        
                    });
                } else if (op === 'suspend' && vm_tmp.power !== 0 && vm_tmp.power !== 2) {
                    that.isInOperation = true;
                    machine.post("restart",vmId).then(function() {
                        
                    });
                } else {

                }
            }
        }
        

    })();