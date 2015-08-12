(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMCtrl', VMCtrl);
    VMCtrl.$inject = ['machine', '$filter', '$modal', '$sce'];

    function VMCtrl(machine, $filter, $modal, $sce) {
        var that = this;
        var orderBy = $filter('orderBy');
        that.deleteVM = {
            selectedVMs: []
        };
        that.selectedAll = false;
        that.showPage = 0;
        that.toggleCheckAll = toggleCheckAll;
        that.sort = [];
        that.changeSorting = changeSorting;
        that.showVmEdit = showVmEdit;
        that.openDeleteDialog = openDeleteDialog;


        that.tabDeleteDialog = []; //array to indicate which vm is in operation
        that.vmIsInOperation = vmIsInOperation;
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        that.isCollapse = true;

        //For small table 4-panels setting
        that.configTmp = {}; //viewTemplate data
        that.CPU = []; //dropdown list
        that.Memory = []; //dropdown list, has relation with CPU
        that.Network = []; //dropdown list(test)
        that.cancelConfig = cancelConfig; //configTmp=vmTemp
        that.updateConfig = updateConfig; //update that.VMs
        that.vmTemp = {}; //store original data
        that.closePanel = closePanel; //close
        //make the selected item in dropdown list to show
        that.selectNetwork = selectNetwork;
        that.selectMemory = selectMemory;
        that.selectCPU = selectCPU;
        //change the repeat number of tpl
        that.changeTplNumber = changeTplNumber;
        that.tplConfig = [];
        //saveTemplatePanel
        that.saveTemp = {};
        that.saveVMTemplate = saveVMTemplate;

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
                idx: "",
                NumOfCPU: ""
            },
            memory: "",
            //? network maybe multiple
            network: [{interface: "", label: "", ip: ""}]
        };

        that.configTmp = {
            name: "",
            description: "",
            CPU: {
                idx: 0,
                NumOfCPU: ""
            },
            memory: {
                memory: ""
            },
            network: [{interface: "", label: "", ip: ""}]
        };

        that.CPU = [{idx: 0,NumOfCPU: "1"}, 
                    {idx: 1,NumOfCPU: "2"}, 
                    {idx: 2,NumOfCPU: "4"}, 
                    {idx: 3,NumOfCPU: "8"}, 
                    {idx: 4,NumOfCPU: "16"}];

        that.Memory = [
            [{memory: "0.5G"}, {memory: "1G"}, {memory: "2G"}, {memory: "4G"}],
            [{memory: "2G"}, {memory: "4G"}, {memory: "8G"}],
            [{memory: "4G"}, {memory: "8G"}, {memory: "16G"}],
            [{memory: "8G"}, {memory: "16G"}],
            [{memory: "16G"}, {memory: "32G"}]
        ];

        that.Network = [{
            label: "Nic1"
        }, {
            label: "Nic2"
        }];

        //Functions
        activate();

        function activate() {
            that.VMs = machine.getVMDetail();
            that.thead = machine.getThead();
            that.VMInfo = machine.transDetailForDis();
            that.tabDeleteDialog = {
                isOpen: false
            };

        }

        function clearArr(arr) {
            arr.splice(0, arr.length);
        }

        /*store vmTemp as a temp var by vmid*/
        function getVMById(vmid) {
            clearArr(that.vmTemp.network);
            angular.forEach(that.VMs, function(obj, key) {
                if (obj.id == vmid) {
                    that.vmTemp.id = obj.id;
                    that.vmTemp.name = obj.name;
                    that.vmTemp.description = obj.description;
                    //var CPUMemoryArr = obj.configuration.split(',');
                    that.vmTemp.CPU.NumOfCPU = obj.cpus;
                    that.vmTemp.memory = machine.transMemFromMB2GB(obj.mem) + 'G';
                    angular.forEach(obj.network, function(obj,key) {
                        that.vmTemp.network.push(obj);
                    });
                }
            });
            angular.forEach(that.CPU, function(obj, key) {
                if (obj.NumOfCPU == that.vmTemp.CPU.NumOfCPU) {
                    that.vmTemp.CPU.idx = obj.idx;
                }
            });
            //            return that.vmTemp;
        }
        //select Virtual machine for delete

        function toggleCheckAll() {
            if (that.deleteVM.selectedVMs.length === that.VMs.length)
                that.deleteVM.selectedVMs = [];
            else
                that.deleteVM.selectedVMs = that.VMs.map(function(item) {
                    return item.id;
                });
        }

        that.sort = {
            column: 'name',
            descending: false
        };

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

        /*show the vm edit page or close it*/
        function showVmEdit(vmid) {
            //that.showPage = !that.showPage;
            if (that.showPage == vmid) {
                that.showPage = 0;
                //clear vm.configTmp.network
            } else {
                getVMById(vmid);
                that.showPage = vmid;
                //find the vm idx;
                that.configTmp.name = that.vmTemp.name;
                that.configTmp.description = that.vmTemp.description;
                that.configTmp.CPU = {
                    idx: that.vmTemp.CPU.idx,
                    NumOfCPU: that.vmTemp.CPU.NumOfCPU
                };
                that.configTmp.memory.memory = that.vmTemp.memory;
                clearArr(that.configTmp.network);
                angular.forEach(that.vmTemp.network, function(obj,key) {
                    that.configTmp.network.push(obj);
                });                
                //saveTemplate panel
                that.saveTemp.name = that.vmTemp.name;
                clearArr(that.tplConfig);
                var temp = {
                    interface: "1",
                    label: "1",
                    ip: ""
                };
                that.tplConfig.push(temp);
                //if have opened saveTemp panel and change, we need to reset that panel.

            }
        }

        function selectNetwork(netIndex, network) {
            that.configTmp.network[netIndex].label = network.label;
        }
        function selectMemory(memory) {
            that.configTmp.memory.memory = memory.memory;
        }
        function selectCPU(CPU) {
            that.configTmp.CPU = CPU;
        } 

        function vmIsInOperation(vmId) {
            //console.log('vmIsInOperation: '+vmId);
            var isInOperation = false;
            angular.forEach(that.inOperation, function(item, index) {
                if (item == vmId) {
                    isInOperation = true;
                }
            });
            return isInOperation;
        }

        function cancelConfig(vmid) {
            getVMById(vmid);
            that.configTmp.name = that.vmTemp.name;
            that.configTmp.description = that.vmTemp.description;
            that.configTmp.CPU.NumOfCPU = that.vmTemp.CPU.NumOfCPU;
            that.configTmp.memory.memory = that.vmTemp.memory;
            clearArr(that.configTmp.network);
            angular.forEach(that.vmTemp.network, function(obj,key) {
                console.log(obj.label);
                that.configTmp.network.push(obj);
            });//? it doesn't work
            that.saveTemp.name = that.vmTemp.name;
            that.saveTemp.modeSaveDisk.saveMode = "convert";
            that.saveTemp.modeSaveDisk.diskMode = "chain";
        }

        function updateConfig(vmid) {
            angular.forEach(that.VMs, function(obj, key) {
                if (obj.id == vmid) {
                    obj.name = that.configTmp.name;
                    obj.cpus = that.configTmp.CPU.NumOfCPU;
                    var gb = parseInt(that.configTmp.memory.memory);
                    obj.mem = machine.transMemFromGB2MB(gb);
                    obj.description = that.configTmp.description;
                    angular.forEach(obj.network, function(obj,key) {
                        var idx=parseInt(obj.interface)-1;
                        obj.label = that.configTmp.network[idx].label;
                        console.log(obj.label);
                    });
                    //console.log(obj.network.length);
                }
            });
            //Here need to add update();
            //close the panel
            showVmEdit(vmid);
        }

        function changeTplNumber(tplConfig, bool) {
            var number = tplConfig.length;
            console.log(number);
            if (bool) {
                if(number+1 > 4) 
                    return -1;
                var temp = {
                    interface: number+1,
                    label: number+1,
                    ip: ""
                };
                tplConfig.push(temp);
            } else {
                if(number-1 < 1)
                    return -1;
                tplConfig.pop();
            }
            
        }

        function closePanel(vmid) {
            cancelConfig(vmid);
            showVmEdit(vmid);
        }

        function saveVMTemplate(vmid) {
            //use API and transport newName and information
            if (that.saveTemp.modeSaveDisk.diskMode === "chain" && that.saveTemp.modeSaveDisk.saveMode === "convert") {
                console.log("chain+convert");
            } else if (that.saveTemp.modeSaveDisk.diskMode === "copy" && that.saveTemp.modeSaveDisk.saveMode === "save") {
                console.log("copy+save");
            }
        }

        that.htmlTooltipSave = $sce.trustAsHtml('<table><tr valign=\"top\"><td><b>Convert:\&nbsp</b></td><td>original VM goes away<br /></td></tr><tr valign=\"top\"><td><b>Copy: </b></td> <td> original VM stays intact, a copy of the VM is saved as a template</td></tr></table>');
        that.htmlTooltipDisk = $sce.trustAsHtml('<table><tr valign=\"top\"><td><b>Chain:\&nbsp</b></td><td>linked to parent VM/template - Most efficient disk usage when updating existing templates<br /></td></tr><tr valign=\"top\"><td><b>Clone:</b></td> <td>fully independent disk with deltas merged - use this for freshly imported VMs and when you want to remove dependency on parent template</td></tr></table>');

        function openDeleteDialog(vmId) {

            var modalInstance = $modal.open({
                templateUrl: 'main/templates/vmDeleteDialog.html',
                controller: 'ModalInstanceCtrl',
                animation: false
            });

        }



        
    }

})();
