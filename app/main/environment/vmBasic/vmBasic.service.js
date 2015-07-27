/**
 * Created by luyongjx on 7/8/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilabService')
        .factory('basicPage',basicPage); //@todo machine

    basicPage.$inject = [];

    function basicPage() {
        //mock data
        var getVMDetail = function(vmId) {
            var detail = [{
                name: 'ilab_id',
                value: 1001,
                displayName: 'iLab ID'
            }, {
                name: 'disk1',
                value: '1GB (0 Chain)',
                displayName: 'Disk1'
            }, {
                name: 'hostname',
                value: '',
                displayName: 'Hostname'
            }, {
                name: 'nic1_mac',
                value: '00:0c:29:63:43:0f',
                displayName: 'Nic1 MAC'
            }, {
                name: 'path',
                value: 'uuid://path-information',
                displayName: 'Path'
            }, {
                name: 'vmm',
                value: 'newUI-1',
                displayName: "VMM"
            }];
            return detail;

        };
        // getter/setter of list of vm data
        var getVMMockData = function(){
            var mockData =
                [{
                    machineType:'VM',
                    statusDisplay:'Running',
                    vmName:'Virtual Machine 1',
                    vmDescription:'This a test VM',
                    vmConfig:'2CPU,4G',
                    vmIP:'10.239.00.01',
                    vmNetwork:'Subnet1'
                }/*,{
                     machineType:'VM',
                     statusDisplay:'Running',
                     vmName:'Virtual Machine 2',
                     vmDescription:'This a test VM',
                     vmConfig:'2CPU,4G',
                     vmIP:'10.239.00.02',
                     vmNetwork:'Subnet2'
                 },{
                     machineType:'VM',
                     statusDisplay:'Suspend',
                     vmName:'Virtual Machine 3',
                     vmDescription:'This a test VM',
                     vmConfig:'2CPU,4G',
                     vmIP:'10.239.00.03',
                     vmNetwork:'Subnet3'
                 },{
                     machineType:'VM',
                     statusDisplay:'Running',
                     vmName:'Virtual Machine 4',
                     vmDescription:'This a test VM',
                     vmConfig:'2CPU,4G',
                     vmIP:'10.239.00.04',
                     vmNetwork:'Subnet4'
                 },{
                     machineType:'PM',
                     statusDisplay:'Stopped',
                     vmName:'Virtual Machine 5',
                     vmDescription:'This a test VM',
                     vmConfig:'2CPU,4G',
                     vmIP:'10.239.00.05',
                     vmNetwork:'Subnet5'
                 }*/];
            return mockData;
        };





        return {
            getVMDetail: getVMDetail,
            getVMMockData:getVMMockData
        };
    }


})();