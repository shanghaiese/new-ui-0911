/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {

    angular
        .module('ilab')
        .controller('EnvCtrl',  EnvCtrl);

    EnvCtrl.$inject = ['environmentService','_env','machine','alert'];

    function EnvCtrl(environmentService,_env,machine,alert){
        var that = this;
        console.log(1);

        //variables
        that.vms = [];
        that.inOperationVMs = [];
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        

        //functions
        that.vmIsInOperation = vmIsInOperation;
        that.loadVMList = loadVMList;
        that.connect = connect;
        that.power = power;
        that.vmIsInOperation = vmIsInOperation;
        that.getVMById = getVMById;


        //init functions
        function activate() {
            loadVMList();
            that.Network = _env.networks;
            that.VMInfo = machine.transDetailForDis();
        }

        /* UT-ok this function use to load the VM data from API and add a new attr to vm*/
        function loadVMList() {
            that.VMs = []; //empty the set before reload;
            var list = _vms;
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

        function getVMDetailInfo(vmid) {
            that.oneVM = [];
            that.oneVM = machine.getVMDetail(vmid).$object;

        }

        /*UT-ok store vmTemp as a temp var by vmid*/
        //?return
        function getVMById(vmid) {
            that.vmTemp.network = [];
            var index = -1;
            //?for 
            angular.forEach(that.VMs, function(obj, key) {
                if (obj.id == vmid) {
                    that.vmTemp.id = obj.id;
                    that.vmTemp.name = obj.name;
                    that.vmTemp.description = obj.description;
                    //var CPUMemoryArr = obj.configuration.split(',');
                    that.vmTemp.CPU.NumOfCPU = obj.cpus;
                    that.vmTemp.memory.memory = machine.transMemFromMB2GB(obj.mem) + 'G';
                    angular.forEach(obj.network, function(obj, key) {
                        that.vmTemp.network.push(obj);
                    });
                    index = key;
                }
            });
            angular.forEach(that.CPU, function(obj, key) {
                if (obj.NumOfCPU == that.vmTemp.CPU.NumOfCPU) {
                    that.vmTemp.CPU.idx = obj.idx;
                }
            });
            if (index !== -1) {
                return that.VMs[index];
            }
        }
        

        function vmIsInOperation(vmId) {
            //console.log('vmIsInOperation: '+vmId);
            var isInOperation = false;
            angular.forEach(that.inOperationVMs, function(item, index) {
                if (item.id === vmId) {
                    isInOperation = true;
                }
            });
            return isInOperation;
        }
       
        function connect(vmId) {
           
        }


}
        function power(vms, op) {
            //make sure that the enter type is array
            var vmsForOperation = [];
            //console.log(typeof(vms.length));
            if (typeof(vms.length) == 'undefined') {
                vmsForOperation.push(vms);
            } else {
                vmsForOperation = vms;
            }

            angular.forEach(vmsForOperation, function(vm) {
                var vmFromAPI = machine.getOneVmForOperation(vm.id);
                var vmFrontEnd = getVMById(vm.id);
                // console.log(vmFrontEnd);
                if (op === 'powerOn' && vmFrontEnd.power !== 1) {
                    that.inOperationVMs.push(vmFrontEnd);
                    vmFromAPI.post("powerOn", vm.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 1) {
                            vmFrontEnd.statusDisplay = 'Running';
                            vmFrontEnd.power = 1;
                            //console.log("Power on successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Power on successfully!'
                            });
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                            //console.log("Power on FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Power on FAILED!'
                            });
                        }
                    });
                } else if (op === 'powerOff' && vmFrontEnd.power !== 0) {
                    that.inOperationVMs.push(vmFrontEnd);
                    vmFromAPI.post("powerOff", vm.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 0) {
                            vmFrontEnd.statusDisplay = 'Stopped';
                            vmFrontEnd.power = 0;
                            //console.log("Power off successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Power off successfully!'
                            });
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                            //console.log("Power off FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Power off FAILED!'
                            });
                        }

                    });
                } else if (op === 'restart' && vmFrontEnd.power !== 0) {
                    that.inOperationVMs.push(vmFrontEnd);
                    vmFromAPI.post("powerReset", vm.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 1) {
                            vmFrontEnd.statusDisplay = 'Running';
                            vmFrontEnd.power = 1;
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                            //console.log("RESTART successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Restart successfully!'
                            });
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                            //console.log("restart FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'restart FAILED!'
                            });
                        }

                    });
                } else if (op === 'suspend' && vmFrontEnd.power !== 0 && vmFrontEnd.power !== 2) {
                    that.inOperationVMs.push(vmFrontEnd);

                    vmFromAPI.post("powerPause", vm.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 2) {
                            vmFrontEnd.statusDisplay = 'Suspended';
                            vmFrontEnd.power = 2;
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
                            //console.log("Suspended successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Suspend successfully!'
                            });
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vmFrontEnd));
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
