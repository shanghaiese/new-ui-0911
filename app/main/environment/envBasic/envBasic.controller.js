/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {

    angular
        .module('ilab')
        .controller('EnvBasicCtrl',  EnvBasicCtrl);

    EnvBasicCtrl.$inject = ['machine','environmentService','_env','alert',];

    function EnvBasicCtrl(machine,environmentService,_env,alert){
        var that = this;

        //variables
        that.vms = [];
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        that.inOperationVMs = [];
        that.env = _env;
        that.vmsInBuckets = []; // Divided all vms into arrays
        /*that.lists = [];  swith env 's machines*/


        //functions
        that.vmIsInOperation = vmIsInOperation;
        that.loadVMList = loadVMList;
        that.connect = connect;
        that.power = power;


        //init functions
        activate();
        function activate() {
            loadVMList();
            if(that.env.virtualMachines.length < 12){
                that.vms = that.env.virtualMachines;
            }else if(that.env.virtualMachines.length > 12){
                that.vmsInBuckets = paging(that.env.virtualMachines,12);
            }
            console.log(_env);

        }

        /*sperate the vmlist into counted lists*/
        function paging(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
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
            angular.forEach(that.inOperationVMs, function(item, index) {
                if (item.id === vmId) {
                    isInOperation = true;
                }
            });
            return isInOperation;
        }
       
        function connect(vmId) {
           console.log(vmId);
        }

        function power(vms, op) {
            //make sure that the enter type is array
            console.log(vms);
            var vmFromAPI = machine.getOneVmForOperation(vms.id);

            var vmsForOperation = [];
            if (typeof(vms.length) == 'undefined') {
                vmsForOperation.push(vms);
            } else {
                vmsForOperation = vms;
            }
            angular.forEach(vmsForOperation, function(vm) {
                console.log(vm);
                //var vmFrontEnd = getVMById(vmId);
                
                if (op === 'powerOn' && vm.power !== 1) {
                    that.inOperationVMs.push(vm);
                    vmFromAPI.post("powerOn", vms.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 1) {
                            vm.statusDisplay = 'Running';
                            vm.power = 1;
                            //console.log("Power on successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Power on successfully!'
                            });
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                            //console.log("Power on FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Power on FAILED!'
                            });
                        }
                    });
                } else if (op === 'powerOff' && vm.power !== 0) {
                    that.inOperationVMs.push(vm);
                    console.log(that.inOperationVMs);
                    vmFromAPI.post("powerOff", vms.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 0) {
                            vm.statusDisplay = 'Stopped';
                            vm.power = 0;
                            //console.log("Power off successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Power off successfully!'
                            });
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                            //console.log("Power off FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'Power off FAILED!'
                            });
                        }

                    });
                } else if (op === 'restart' && vm.power !== 0) {
                    that.inOperationVMs.push(vm);
                    vmFromAPI.post("powerReset", vms.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 1) {
                            vm.statusDisplay = 'Running';
                            vm.power = 1;
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                            //console.log("RESTART successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Restart successfully!'
                            });
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                            //console.log("restart FAILED!");
                            alert.open({
                                type: 'danger',
                                message: 'restart FAILED!'
                            });
                        }

                    });
                } else if (op === 'suspend' && vm.power !== 0 && vm.power !== 2) {
                    that.inOperationVMs.push(vm);

                    vmFromAPI.post("powerPause", vms.id).then(function(returnData) {
                        //console.log(returnData);
                        if (returnData.power === 2) {
                            vm.statusDisplay = 'Suspended';
                            vm.power = 2;
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
                            //console.log("Suspended successfully!");
                            alert.open({
                                type: 'success',
                                message: 'Suspend successfully!'
                            });
                        } else {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(vm));
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

        //that.selected = that.lists[{env.name}]
        //var envList = Restangular.all('environments').getlist();
        
    }
})();
