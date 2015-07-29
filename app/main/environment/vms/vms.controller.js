(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMsCtrl', VMsCtrl);
    VMsCtrl.$inject = ['machine','$filter', '$modal'];

    function VMsCtrl(machine, $filter, $modal) {
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


        that.tabDeleteDialog =[];    //array to indicate which vm is in operation
        that.vmIsInOperation = vmIsInOperation;
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        that.isCollapse = true;

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

        //Functions
        activate();

        function activate(){
            that.VMs = machine.getVMDetail();

            that.thead = machine.getThead();
            that.tabDeleteDialog = {
                isOpen: false
            };

        }

        function getVMById(vmid) {
            var vmFound=null;
            angular.forEach(that.VMs, function(obj, key) {
                if(obj.id == vmid) {
                    vmFound = obj;
                }
            });
            return vmFound;
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
                that.showPage = vmid;
                var idx=0;
                //find the vm idx;
                var vmFound = getVMById(vmid);
                that.configTmp.name=vmFound.displayName;
                that.configTmp.description=vmFound.IP;
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



        that.open = function(size) {

            var modalInstance = $modal.open({
                templateUrl: 'main/templates/vmDeleteDialog.html',
                controller: 'ModalInstanceCtrl',
                }
            );

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }

})();
