(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VmCtrl', VmCtrl);
    VmCtrl.$inject = ['machine', '$filter', '$modal', '$sce', '_vms', 'alert', '_env'];

    function VmCtrl(machine, $filter, $modal, $sce, _vms, alert, _env) {
        var that = this;

        //variables
        var orderBy = $filter('orderBy');
        that.selectedVMs = [];
        that.inOperationVMs = [];
        that.selectedAll = false;
        that.showPage = 0;
        that.sort = [];
        that.tabDeleteDialog = []; //array to indicate which vm is in operation
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        that.isCollapse = true;


        //functions
        that.toggleCheckAll = toggleCheckAll;
        that.changeSorting = changeSorting;
        that.showVmEdit = showVmEdit;
        that.openDeleteDialog = openDeleteDialog;
        that.vmIsInOperation = vmIsInOperation;
        that.loadVMList = loadVMList;
        that.disableSelection = disableSelection;
        that.powerOperation = powerOperation;
        that.getVMById = getVMById;
        that.getVMDetailInfo = getVMDetailInfo;
        that.close = close;

        //For small table 4-panels setting
        that.configTmp = {}; //viewTemplate data
        that.Network = []; //dropdown list(test)
        that.cancelConfig = cancelConfig; //configTmp=vmTemp
        that.updateConfig = updateConfig; //update that.VMs

        //make the selected item in dropdown list to show
        that.selectNetwork = selectNetwork;
        that.selectMemory = selectMemory;
        that.selectCPU = selectCPU;

        //saveTemplatePanel
        that.saveVMTemplate = saveVMTemplate;
        that.changeTplNumber = changeTplNumber;
        that.tplConfig = [];
        
        that.saveTemp = {
            name: "",
            modeSaveDisk: {
                diskMode: "chain",
                saveMode: "convert"
            },
            network: []
        };

        that.vmTemp = {
            id: "",
            name: "",
            description: "",
            CPU: {
                index: "",
                NumOfCPU: ""
            },
            memory: {
                memory: ""
            },
            //? network maybe multiple
            network: [{
                interface: "",
                label: "",
                ip: ""
            }]
        };

        that.CPU = [{index: 0, NumOfCPU: "1"}, 
                    {index: 1, NumOfCPU: "2"}, 
                    {index: 2, NumOfCPU: "4"}, 
                    {index: 3, NumOfCPU: "8"}, 
                    {index: 4, NumOfCPU: "16"}];

        that.Memory = [
                        [{memory: "0.5G"}, {memory: "1G"}, {memory: "2G"}, {memory: "4G"}],
                        [{memory: "2G"}, {memory: "4G"}, {memory: "8G"}],
                        [{memory: "4G"}, {memory: "8G"}, {memory: "16G"}],
                        [{memory: "8G"}, {memory: "16G"}],
                        [{memory: "16G"}, {memory: "32G"}]
                      ];
        
        that.htmlTooltipSave = $sce.trustAsHtml('<table><tr valign=\"top\"><td><b>Convert:\&nbsp</b></td><td>original VM goes away<br /></td></tr><tr valign=\"top\"><td><b>Copy: </b></td> <td> original VM stays intact, a copy of the VM is saved as a template</td></tr></table>');
        that.htmlTooltipDisk = $sce.trustAsHtml('<table><tr valign=\"top\"><td><b>Chain:\&nbsp</b></td><td>linked to parent VM/template - Most efficient disk usage when updating existing templates<br /></td></tr><tr valign=\"top\"><td><b>Clone:</b></td> <td>fully independent disk with deltas merged - use this for freshly imported VMs and when you want to remove dependency on parent template</td></tr></table>');

        //Functions
        activate();

        function activate() {
            //that.VMs = machine.getVMDetail().then(function(data) {
            //     that.VMs = data;
            // });
            //that.VMs = machine.getVMDetail().$object;
            loadVMList();
            // machine.getEnvNetworks().then(function(data) {
            //      that.Network = data.networks;
            // });
            that.Network = _env.networks;
            that.thead = machine.getThead();
            that.VMInfo = machine.transDetailForDis();
            that.tabDeleteDialog = {
                isOpen: false
            };
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

        /*disable the Action dropdown options when selected vm has suspended*/
        function disableSelection() {
            that.disableOption = 'enable';
            angular.forEach(that.selectedVMs, function(item) {
                if (item.statusDisplay === 'Suspended')
                    that.disableOption = 'disabled';
            });
        }


        /**/
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
                    that.vmTemp.CPU.index = obj.index;
                }
            });
            if (index !== -1) {
                return that.VMs[index];
            }
        }
        //select Virtual machine for delete

        function toggleCheckAll() {
            if (that.selectedVMs.length === that.VMs.length)
                that.selectedVMs = [];
            else
                that.selectedVMs = that.VMs.map(function(item) {
                    return item;
                });
        }

        /*sort fn, sort by column name*/

        function changeSorting(column) {
            var sort = that.sort;
            if (sort.column === column) {
                sort.descending = !sort.descending;
                that.VMs = orderBy(that.VMs, that.sort.column, that.sort.descending);
            } else {
                sort.column = column;
                sort.descending = false;
                that.VMs = orderBy(that.VMs, that.sort.column, that.sort.descending);
            }
        }

        /*UT-ok show the vm edit page or close it*/
        // if bool == true, means update, the data should change. Otherwise, no change in data.
        function showVmEdit(vmid, bool) {
            var temp = {
                interface: "1",
                label: "1",
                ip: ""
            };
            //that.showPage = !that.showPage;
            if (that.showPage == vmid && bool === true) {
                that.showPage = 0;
                //cancelConfig(vmid);
                //clear vm.configTmp.network
            } else if (that.showPage == vmid && bool === false) {
                that.showPage = 0;
                cancelConfig(vmid);
            } else {
                getVMById(vmid);
                getVMDetailInfo(vmid);
                that.showPage = vmid;
                //find the vm index;
                angular.copy(that.vmTemp, that.configTmp);
                //saveTemplate panel
                that.saveTemp.name = that.vmTemp.name;
                that.tplConfig = [];

                that.tplConfig.push(temp);
                //if have opened saveTemp panel and change, we need to reset that panel.

            }
        }

        //UT-ok
        function selectNetwork(netIndex, network) {
            that.configTmp.network[netIndex].label = network.name;
        }

        //UT-ok
        function selectMemory(memory) {
            that.configTmp.memory.memory = memory.memory;
        }

        //UT-ok
        function selectCPU(CPU) {
            that.configTmp.CPU = CPU;
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

        //UT-ok
        function cancelConfig(vmid) {
            angular.copy(that.vmTemp, that.configTmp);
            that.saveTemp.name = that.vmTemp.name;
            that.saveTemp.modeSaveDisk.saveMode = "convert";
            that.saveTemp.modeSaveDisk.diskMode = "chain";
        }

        function updateConfig(vmid) {
            var index;
            angular.forEach(that.VMs, function(obj, key) {
                if (obj.id == vmid) {
                    obj.name = that.configTmp.name;
                    obj.cpus = that.configTmp.CPU.NumOfCPU;
                    var gb = parseInt(that.configTmp.memory.memory);
                    obj.mem = machine.transMemFromGB2MB(gb);
                    obj.description = that.configTmp.description;
                    angular.forEach(obj.network, function(obj, key) {
                        index = parseInt(obj.interface) - 1;
                        console.log(index);
                        obj.label = that.configTmp.network[index].label;
                    });
                }
            });
            //Here need to add update();
            //close the panel
            machine.updateVMDetail(vmid, that.configTmp);
            showVmEdit(vmid, true);
        }

        function changeTplNumber(tplConfig, bool) {
            var temp = {
                interface: "",
                label: "",
                ip: ""
            };
            var number = tplConfig.length;
            if (bool) {
                if (number + 1 > 4)
                    return -1;
                temp = {
                    interface: number + 1,
                    label: number + 1,
                    ip: ""
                };
                that.tplConfig.push(temp);
            } else {
                if (number - 1 < 1)
                    return -1;
                that.tplConfig.pop();
            }

        }

        function saveVMTemplate(vmid) {
            var saveTpl = {
                "name": "",
                "copy": false,
                "clone": false,
                "nic": ["0", "0", "0", "0"],
                "details": "",
                "async": false
            };
            //use API and transport newName and information
            saveTpl.name = that.saveTemp.name;
            if (that.saveTemp.modeSaveDisk.diskMode === "copy") {
                saveTpl.copy = true;
            }
            if (that.saveTemp.modeSaveDisk.saveMode === "clone") {
                saveTpl.clone = true;
            }
            machine.saveVMTpl(vmid, saveTpl);
        }


        function powerOperation(vms, op) {
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

        function openDeleteDialog(width) {

            var modalInstance = $modal.open({
                templateUrl: 'main/templates/vmDeleteDialog.html',
                controller: 'ModalInstanceCtrl',
                animation: false,
                width:width

            });

            modalInstance.result.then(function(confirm) {
                that.dialogResult = confirm;
                if (that.dialogResult === true) {
                    console.log();

                    /*push vm into inOperation*/
                    angular.forEach(that.selectedVMs, function(selectedVM) {
                        that.inOperationVMs.push(selectedVM);
                    });
                    /*call api to delete vm*/
                    angular.forEach(that.selectedVMs, function(virtualMachineForDelete) {
                        machine.deleteVM(virtualMachineForDelete.id).then(function() {
                            that.inOperationVMs.splice(that.inOperationVMs.indexOf(virtualMachineForDelete));
                            that.VMs.splice(that.VMs.indexOf(virtualMachineForDelete));
                        });
                    });

                }
                console.log('Modal dismissed at: ' + new Date());
            });
        }

        function close(index) {
            alert.close(index);
        }

    }

})();
