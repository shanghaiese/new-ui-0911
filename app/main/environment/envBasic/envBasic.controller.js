/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {

    angular
        .module('ilab')
        .controller('EnvCtrl',  EnvCtrl);

    EnvCtrl.$inject = ['machine','environmentService','_env','alert'];

    function EnvCtrl(machine,environmentService,_env,alert){
        var that = this;

        //variables
        that.vms = [];
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        var inOperationVMs = [];
        
        //functions
        that.vmIsInOperation = vmIsInOperation;
        that.loadVMList = loadVMList;
        that.connect = connect;
        that.power = power;
        that.vmIsInOperation = vmIsInOperation;


        //init functions
        activate();
        function activate() {
            loadVMList();
            that.Network = _env.networks;
            that.VMInfo = machine.transDetailForDis();
        }

        /* UT-ok this function use to load the VM data from API and add a new attr to vm*/
        function loadVMList() {

            that.VMs = []; //empty the set before reload;
            var list = _env.virtualMachines;
            
            angular.forEach(list, function(value, index) {
                if (value.disable === 0) {

                    switch (value.power) {
                        case 0:
                            angular.extend(value, {
                                statusDisplay: 'Stopped'
                            });
                            that.VMs.push(value);
                            break;
                        case 1:
                            angular.extend(value, {
                                statusDisplay: 'Running'
                            });
                            that.VMs.push(value);
                            break;
                        case 2:
                            angular.extend(value, {
                                statusDisplay: 'Suspended'
                            });
                            that.VMs.push(value);
                            break;
                    }
                } else if (value.disable === 4) {
                    angular.extend(value, {
                        statusDisplay: 'Disconnected'
                    });
                    that.VMs.push(value);

                }
            });
        }

        function vmIsInOperation(vmId) {
            //console.log('vmIsInOperation: '+vmId);
            var isInOperation = false;
            angular.forEach(inOperationVMs, function(item, index) {
                if (item.id === vmId) {
                    isInOperation = true;
                }
            });
            return isInOperation;
        }
       
        function connect(vmId) {
           console.log(vmId);
        }


}
        function power(vms, op) {
            //make sure that the enter type is array
            var vmsForOperation = [];

            
            if (typeof(vms.length) == 'undefined') {
                vmsForOperation.push(vms);
            } else {
                vmsForOperation = vms;
            }
            angular.forEach(vmsForOperation, function(vm) {
                var vmFromAPI = vm;
                console.log(vmFromAPI);
                //var vmFrontEnd = getVMById(vmId);
                
                if (op === 'powerOn' && vms.power !== 1) {
                    inOperationVMs.push(vms);
                    vmFromAPI.post("powerOn", vmid).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 1) {
                            vms.statusDisplay = 'Running';
                            vms.power = 1;
                            //console.log("Power on successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Power on successfully!'
                            });
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                        } else {
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                            //console.log("Power on FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Power on FAILED!'
                            });
                        }
                    });
                } else if (op === 'powerOff' && vms.power !== 0) {
                    console.log(inOperationVMs);
                    inOperationVMs.push(vms);
                    vmFromAPI.post("powerOff", vmid).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 0) {
                            vms.statusDisplay = 'Stopped';
                            vms.power = 0;
                            //console.log("Power off successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Power off successfully!'
                            });
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                        } else {
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                            //console.log("Power off FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Power off FAILED!'
                            });
                        }

                    });
                } else if (op === 'restart' && vms.power !== 0) {
                    inOperationVMs.push(vms);
                    vmFromAPI.post("powerReset", vmid).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 1) {
                            vms.statusDisplay = 'Running';
                            vms.power = 1;
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                            //console.log("RESTART successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Restart successfully!'
                            });
                        } else {
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                            //console.log("restart FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'restart FAILED!'
                            });
                        }

                    });
                } else if (op === 'suspend' && vms.power !== 0 && vms.power !== 2) {
                    inOperationVMs.push(vms);

                    vmFromAPI.post("powerPause", vmid).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 2) {
                            vms.statusDisplay = 'Suspended';
                            vms.power = 2;
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                            //console.log("Suspended successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Suspend successfully!'
                            });
                        } else {
                            inOperationVMs.splice(inOperationVMs.indexOf(vms));
                            //console.log("Suspended FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Suspended FAILED!'
                            });
                        }

                    });
                }

            });
        }



})();
