
(function(){
    angular.module('ilab')
        .controller('physicalMachineCtrl', physicalMachineCtrl);

    physicalMachineCtrl.$inject = ['machine', '$filter'];
    function physicalMachineCtrl(machine, $filter) {
        var that = this;
        var orderBy = $filter('orderBy');

        /*varials*/
        that.PhysicalMachines = [];
        that.thead = [];
        that.PhysicalMachineInfo = [];
        that.PhysicalMachine = {
            selectedPhysicalMachines: []
        };
        that.selectedAll = false;
        that.showPage = false;
        that.everyPhysicalMachine = [];
        that.sort = [];

        /*functions*/
        that.changeSorting = changeSorting;
        that.showVmEdit = showVmEdit;
        that.toggleCheckAll = toggleCheckAll;

        that.tabDeleteDialog = []; //array to indicate which physicalmachine is in operation
        that.physicalmachineIsInOperation = physicalmachineIsInOperation;
        that.whichPhysicalMachineIsOpen = ''; //physicalmachine id to track and control which physicalmachine config is open
        that.isCollapse = true;

        //For small table 4-panels setting
        that.configTmp = {};
        that.Network = [];
        that.cancelConfig = cancelConfig;
        that.updateConfig = updateConfig;


        //Functions
        activate();

        function activate() {
            that.PhysicalMachine = machine.getPhysicalMachine();
            that.thead = machine.getPMThead();
            that.tabDeleteDialog = {
                isOpen: false
            };
        }

    }



})();