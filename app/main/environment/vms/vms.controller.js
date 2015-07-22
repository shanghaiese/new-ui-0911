(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMsCtrl', VMsCtrl);
    VMsCtrl.$inject = ['machine','$filter'];

    function VMsCtrl(machine, $filter) {
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

        //For small table 4-panels setting
        that.configTmp = {};
        that.CPU = [];
        that.Memory = [];
        that.Network = [];
        that.cancelConfig = cancelConfig;
        that.submit = submit;
        that.saveTemp = {};

        that.saveTemp = {
            diskMode: "chain",
            saveMode: "convert"
        };

        that.configTmp = {
            name: "testVM",
            description: "This is a test VM",
            CPU: "",
            memory: "",
            Network: ""
        };

        that.CPU = [{idx: 0, NumOfCPU: "1" }, 
                    {idx: 1, NumOfCPU: "2" }, 
                    {idx: 2, NumOfCPU: "4" }, 
                    {idx: 3, NumOfCPU: "8" }, 
                    {idx: 4, NumOfCPU: "16" }];

        that.Memory = [
                      [{memory: "0.5"}, {memory: "1"}, {memory: "2"}, {memory: "4"}],
                      [{memory: "2"}, {memory: "4"}, {memory: "8"}],
                      [{memory: "4"}, {memory: "8"}, {memory: "16"}],
                      [{memory: "8"}, {memory: "16"}],
                      [{memory: "16"}, {memory: "32"}]
                      ];

        that.Network = [{Nic: "Nic1"}, {Nic: "Nic2"}];

        that.dynamicPopoverSave = {
            convert: "Convert",
            save: "Save",
            convertContent: "original VM goes away",
            saveContent: "original VM stays intact, a copy of the VM is saved as a template",
            templateUrl: "saveTempInfo"
        }
        //Functions
        activate();

        function activate(){
            that.VMs = [{ 
            id: 'VM001',
            name: 'ilab_id',
            IP: '10.192.168.1',
            displayName: 'iLab ID',
            configuration: '2CPU,4G' 
        }, {
            id: 'VM002',
            name: 'disk1',
            IP: '10.192.168.2',
            displayName: 'Disk1',
            configuration: '2CPU,4G' 
        }, {
            id: 'VM003',
            name: 'hostname',
            IP: '10.192.168.3',
            displayName: 'Hostname',
            configuration: '2CPU,4G' 
        }, {
            id: 'VM004',
            name: 'nic1_mac',
            IP: '10.192.168.6',
            displayName: 'Nic1 MAC',
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
        function showVmEdit() {
            that.showPage = !that.showPage;
            that.configTmp.name = that.VMs[0].name;
        }

        function cancelConfig() {
            that.configTmp.name = "";
            that.configTmp.description = "";
            that.configTmp.Memory = "None";
            that.configTmp.CPU = "None";
            that.configTmp.Network = "None";
            console.log("cancelConfig");
        }

        function submit() {
            alert('Submit Success');
        }
    }

})();
