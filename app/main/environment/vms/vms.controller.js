(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMsCtrl', VMsCtrl);

    VMsCtrl.$inject = ['machine','$filter'];

    function VMsCtrl(machine, filter) {
        var that = this;

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

            that.items = ["List", "Of", "Items", "David"];
            /*sort fn, sort by column name*/
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

            //select Virtual machine for delete
            that.a = {
            	selectedVMs: []
            };
            that.checkall = false;
            that.toggleCheckAll = function() {
                that.checkall = true;
            };

            that.sort = {
                column: 'displayName',
                descending: false
            };

            var orderBy = filter('orderBy');
            that.changeSorting = function(column) {
                var sort = that.sort;
                if (sort.column === column) {
                    sort.descending = !sort.descending;
                    that.VMs = orderBy(that.VMs, that.sort.column, that.sort.descending);
                } else {
                    sort.column = column;
                    sort.descending = false;
                    that.VMs = orderBy(that.VMs, that.sort.column, that.sort.descending);
                }
            };
    }

})();
