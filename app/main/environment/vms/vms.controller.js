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

        that.inOperation =[];    //array to indicate which vm is in operation
        that.vmIsInOperation = vmIsInOperation;
        that.whichVMIsOpen = ''; //vm id to track and control which vm config is open
        that.isCollapse = true;

        activate();

        function activate(){
            that.VMs = machine.getVMDetail();

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
        function showVmEdit(id) {
            //that.showPage = !that.showPage;
            if(that.showPage == id)
                {that.showPage = 0;}
            else
            that.showPage = id;
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

        


    }

})();
