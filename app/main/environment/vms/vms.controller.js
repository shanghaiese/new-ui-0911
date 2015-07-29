(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMsCtrl', VMsCtrl);
    VMsCtrl.$inject = ['machine', '$filter', '$sce'];

    function VMsCtrl(machine, $filter, $sce) {
        var that = this;
        var orderBy = $filter('orderBy');

        that.VMs = [];
        that.thead = [];
        that.deleteVM = {
            selectedVMs: []
        };
        that.selectedAll = false;
        that.showPage = false;
        that.toggleCheckAll = toggleCheckAll;
        that.sort = [];
        that.changeSorting = changeSorting;
        that.showVmEdit = showVmEdit;

        that.inOperation =[];    //array to indicate which vm is in operation
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
            IP:"",
            CPU: {idx: "", NumOfCPU: ""},
            memory: "",
            //? network maybe multiple
            network: ""
        };

        that.configTmp = {
            name: "",
            description: "",
            CPU: {idx: 0, NumOfCPU: ""},
            memory: {memory: ""},
            network: ""
        };

        that.CPU = [{idx: 0, NumOfCPU: "1CPU" }, 
                    {idx: 1, NumOfCPU: "2CPU" }, 
                    {idx: 2, NumOfCPU: "4CPU" }, 
                    {idx: 3, NumOfCPU: "8CPU" }, 
                    {idx: 4, NumOfCPU: "16CPU" }];

        that.Memory = [
                      [{memory: "0.5G"}, {memory: "1G"}, {memory: "2G"}, {memory: "4G"}],
                      [{memory: "2G"}, {memory: "4G"}, {memory: "8G"}],
                      [{memory: "4G"}, {memory: "8G"}, {memory: "16G"}],
                      [{memory: "8G"}, {memory: "16G"}],
                      [{memory: "16G"}, {memory: "32G"}]
                      ];

        that.Network = [{Nic: "Nic1"}, {Nic: "Nic2"}];

        //Functions
        activate();

        function activate(){
            that.VMs = [{ 
                id: 'VM001',
                name: 'ilab_id',
                IP: '10.192.168.1',
                displayName: 'yoyoyo',
                configuration: '2CPU,4G'
            }, {
                id: 'VM002',
                name: 'disk1',
                IP: '10.192.168.2',
                displayName: 'checkitout',
                configuration: '2CPU,4G' 
            }, {
                id: 'VM003',
                name: 'hostname',
                IP: '10.192.168.3',
                displayName: 'comeonbaby',
                configuration: '2CPU,4G' 
            }, {
                id: 'VM004',
                name: 'nic1_mac',
                IP: '10.192.168.0',
                displayName: 'dontbeshy',
                configuration: '2CPU,4G' 
            }, {
                id: 'VM005',
                name: 'path',
                IP: '10.192.168.4',
                displayName: 'Path',
                configuration: '2CPU,4G' 
            }, {
                id: 'VM006',
                name: 'vmm',
                IP: '10.192.168.5',
                displayName: "VMM",
                configuration: '2CPU,4G' 
            }];

            that.thead = [{
                display: 'Name',
                name: 'displayName'
            },  {
                display: 'IP',
                name: 'IP'
            }, {
                display: 'Configuration',
                name: 'configuration'
            }, {
                display: 'Connect',
                name: 'console'
            }, {
                display: 'Power',
                name: 'statusOrderPriority'
            }];

        }

        function getVMById(vmid) {
            angular.forEach(that.VMs, function(obj, key) {
                if(obj.id == vmid) {
                    that.vmFound.id=obj.id;
                    that.vmFound.name=obj.displayName;
                    that.vmFound.IP=obj.IP;
                    var CPUMemoryArr=obj.configuration.split(',');
                    that.vmFound.CPU.NumOfCPU=CPUMemoryArr[0];
                    that.vmFound.memory=CPUMemoryArr[1];    
                }
            });
            angular.forEach(that.CPU, function(obj, key) {
                if(obj.NumOfCPU == that.vmFound.CPU.NumOfCPU) {
                    that.vmFound.CPU.idx=obj.idx;
                }
            });
//            return that.vmFound;
        }
        //select Virtual machine for delete

        function toggleCheckAll() {
            if(that.deleteVM.selectedVMs.length === that.VMs.length)
                that.deleteVM.selectedVMs = [];
            else
                that.deleteVM.selectedVMs = that.VMs.map(function(item){return item.id; });
        }

        that.sort = {
            column: 'displayName',
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
            if(that.showPage == vmid) {
                that.showPage = 0;
            }
            else {
                getVMById(vmid);
                that.showPage = vmid;
                //find the vm idx;
                that.configTmp.name=that.vmFound.name;
                that.configTmp.description=that.vmFound.IP;
                that.configTmp.CPU={
                    idx: that.vmFound.CPU.idx,
                    NumOfCPU: that.vmFound.CPU.NumOfCPU
                };
                that.configTmp.memory.memory=that.vmFound.memory;
                //saveTemplate panel
                that.saveTemp.name=that.vmFound.name; 
                //if have opened saveTemp panel and change, we need to reset that panel.
                
            }
            //that.isCollapse = !that.isCollapse;
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
            that.configTmp.name=that.vmFound.name;
            that.configTmp.description=that.vmFound.IP;
            that.configTmp.CPU.NumOfCPU=that.vmFound.CPU.NumOfCPU;
            that.configTmp.memory.memory=that.vmFound.memory;

            that.saveTemp.name=that.vmFound.name;
            that.saveTemp.modeSaveDisk.saveMode="convert";
            that.saveTemp.modeSaveDisk.diskMode="chain";
        }

        function updateConfig(vmid) {
            angular.forEach(that.VMs, function(obj, key) {
                if(obj.id == vmid) {
                    obj.displayName=that.configTmp.name;
                    obj.configuration=that.configTmp.CPU.NumOfCPU + ',' + that.configTmp.memory.memory;
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
            if(that.saveTemp.modeSaveDisk.diskMode === "chain" && that.saveTemp.modeSaveDisk.saveMode === "convert") {
                console.log("chain+convert");
            } else if(that.saveTemp.modeSaveDisk.diskMode === "copy" && that.saveTemp.modeSaveDisk.saveMode === "save") {
                console.log("copy+save");
            }
        }

        that.htmlTooltipSave = $sce.trustAsHtml('<table><tr valign=\"top\"><td><b>Convert:\&nbsp</b></td><td>original VM goes away<br /></td></tr><tr valign=\"top\"><td><b>Copy: </b></td> <td> original VM stays intact, a copy of the VM is saved as a template</td></tr></table>');
        that.htmlTooltipDisk = $sce.trustAsHtml('<table><tr valign=\"top\"><td><b>Chain:\&nbsp</b></td><td>linked to parent VM/template - Most efficient disk usage when updating existing templates<br /></td></tr><tr valign=\"top\"><td><b>Clone:</b></td> <td>fully independent disk with deltas merged - use this for freshly imported VMs and when you want to remove dependency on parent template</td></tr></table>');
    }

})();
