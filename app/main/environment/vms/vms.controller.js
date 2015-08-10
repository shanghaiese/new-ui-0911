(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMsCtrl', VMsCtrl);
    VMsCtrl.$inject = ['machine', '$filter', '$modal', '$sce'];

    function VMsCtrl(machine, $filter, $modal, $sce) {
        var that = this;
        var orderBy = $filter('orderBy');

        /*varials*/
        that.VMs = [];
        that.thead = [];
        that.VMInfo = [];
        that.deleteVM = {
            selectedVMs: []
        };
        that.selectedAll = false;
        that.showPage = false;
        that.everyVM = [];
        that.sort = [];

        /*functions*/
        that.changeSorting = changeSorting;
        that.showVmEdit = showVmEdit;
        that.toggleCheckAll = toggleCheckAll;

        that.tabDeleteDialog = []; //array to indicate which vm is in operation
        that.vmIsInOperation = vmIsInOperation;
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        that.isCollapse = true;

        //For small table 4-panels setting
        that.configTmp = {};
        that.CPU = [];
        that.Memory = [];
        that.Network = [];
        that.cancelConfig = cancelConfig;
        that.updateConfig = updateConfig;
        that.vmFound = {};
        that.closePanel = closePanel;

        //saveTemplatePanel
        that.saveTemp = {};
        that.saveVMTemplate = saveVMTemplate;

        that.saveTemp = {
            name: "",
            modeSaveDisk: {
                diskMode: "chain",
                saveMode: "convert"
            },
            network: ""
        };

        that.vmFound = {
            id: "",
            name: "",
            description: "",
            IP: "",
            CPU: {
                idx: "",
                NumOfCPU: ""
            },
            memory: "",
            //? network maybe multiple
            network: ""
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
            network: ""
        };

        that.CPU = [{
            idx: 0,
            NumOfCPU: "1CPU"
        }, {
            idx: 1,
            NumOfCPU: "2CPU"
        }, {
            idx: 2,
            NumOfCPU: "4CPU"
        }, {
            idx: 3,
            NumOfCPU: "8CPU"
        }, {
            idx: 4,
            NumOfCPU: "16CPU"
        }];

        that.Memory = [
            [{
                memory: "0.5G"
            }, {
                memory: "1G"
            }, {
                memory: "2G"
            }, {
                memory: "4G"
            }],
            [{
                memory: "2G"
            }, {
                memory: "4G"
            }, {
                memory: "8G"
            }],
            [{
                memory: "4G"
            }, {
                memory: "8G"
            }, {
                memory: "16G"
            }],
            [{
                memory: "8G"
            }, {
                memory: "16G"
            }],
            [{
                memory: "16G"
            }, {
                memory: "32G"
            }]
        ];

        that.Network = [{
            Nic: "Nic1"
        }, {
            Nic: "Nic2"
        }];

        //Functions
        activate();

        function activate() {
            that.VMs = machine.getVMDetail();

            that.thead = machine.getThead();
            //that.VMInfo = machine.transDetailForDis(that.VMs);
            that.tabDeleteDialog = {
                isOpen: false
            };

        }

        function getVMById(vmid) {
            angular.forEach(that.VMs, function(obj, key) {
                if (obj.id == vmid) {
                    that.vmFound.id = obj.id;
                    that.vmFound.name = obj.name;
                    that.vmFound.IP = obj.network.ip;
                    //var CPUMemoryArr = obj.configuration.split(',');
                    that.vmFound.CPU.NumOfCPU = obj.cpus;
                    that.vmFound.memory = obj.mem;
                }
            });
            angular.forEach(that.CPU, function(obj, key) {
                if (obj.NumOfCPU == that.vmFound.CPU.NumOfCPU) {
                    that.vmFound.CPU.idx = obj.idx;
                }
            });
            //            return that.vmFound;
        }


        /*function getVMInfoById(vmid) {
            
            angular.forEach(that.VMInfo, function(obj, key) {
                if (obj.['iLab ID'] == vmid) {
                    that.everyVM = obj;
                }
            });
        }*/
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
            } else {
                getVMById(vmid);
                that.showPage = vmid;
                //find the vm idx;
                that.configTmp.name = that.vmFound.name;
                that.configTmp.description = that.vmFound.IP;
                that.configTmp.CPU = {
                    idx: that.vmFound.CPU.idx,
                    NumOfCPU: that.vmFound.CPU.NumOfCPU
                };
                that.configTmp.memory.memory = that.vmFound.memory;
                //saveTemplate panel
                that.saveTemp.name = that.vmFound.name;
                //if have opened saveTemp panel and change, we need to reset that panel.

            }
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
            that.configTmp.name = that.vmFound.name;
            that.configTmp.description = that.vmFound.IP;
            that.configTmp.CPU.NumOfCPU = that.vmFound.CPU.NumOfCPU;
            that.configTmp.memory.memory = that.vmFound.memory;

            that.saveTemp.name = that.vmFound.name;
            that.saveTemp.modeSaveDisk.saveMode = "convert";
            that.saveTemp.modeSaveDisk.diskMode = "chain";
        }

        function updateConfig(vmid) {
            angular.forEach(that.VMs, function(obj, key) {
                if (obj.id == vmid) {
                    obj.displayName = that.configTmp.name;
                    obj.configuration = that.configTmp.CPU.NumOfCPU + ',' + that.configTmp.memory.memory;
                }
            });
            //Here need to add update();
            //close the panel
            showVmEdit(vmid);
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

        that.open = function(size) {

            var modalInstance = $modal.open({
                templateUrl: 'main/templates/vmDeleteDialog.html',
                controller: 'ModalInstanceCtrl',
                animation: false
            });

            var $modal_dialog = $(this).find(".modal-dialog");
            var m_top = (($(window).height() - 200) / 2);
            $modal_dialog.css({
                'margin': m_top + 'px auto'
             });
        };

        
    }

})();