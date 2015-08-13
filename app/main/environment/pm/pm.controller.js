
(function(){
    angular.module('ilab')
        .controller('physicalMachineCtrl', physicalMachineCtrl);

    physicalMachineCtrl.$inject = ['machine', '$filter'];
    function physicalMachineCtrl(machine, $filter) {
        var that = this;
        var orderBy = $filter('orderBy');
        console.log('1');

        /*varials*/
        that.PhysicalMachines = [];
        that.PMThead = [];
       
        that.selectedAll = false;
        that.showPage = false;
        that.everyPhysicalMachine = [];
        that.sort = [];

        /*functions*/
        // that.changeSorting = changeSorting;
        // that.showPhysicalMachineEdit = showVmEdit;
        // that.toggleCheckAll = toggleCheckAll;

        // that.tabDeleteDialog = []; //array to indicate which physicalmachine is in operation
        // that.physicalmachineIsInOperation = physicalmachineIsInOperation;
        // that.whichPhysicalMachineIsOpen = ''; //physicalmachine id to track and control which physicalmachine config is open
        // that.isCollapse = true;

        //Functions
        activate();

        function activate() {
            that.PhysicalMachines = machine.getPhysicalMachineDetail();
            that.PMThead = machine.getPhysicalMachineThead();
            that.tabDeleteDialog = {
                isOpen: false
            };
        }

        function openDeleteDialog(vmId) {

            var modalInstance = $modal.open({
                templateUrl: 'main/templates/vmDeleteDialog.html',
                controller: 'ModalInstanceCtrl',
                animation: false

            });

            modalInstance.result.then(function (result) {
                 if(result===true)
                 {
                    console.log(vmId);  
                    return vmId; 
                }
                  console.log('Modal dismissed at: ' + new Date());
                });
        }

    }



})();