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
                    id: 1,
                    status:'Running',
                    name:'Virtual Machine 1',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 2,
                    status:'Stopped',
                    name:'Virtual Machine 2',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 3,
                    status:'Running',
                    name:'Virtual Machine 3',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 4,
                    status:'Suspend',
                    name:'Virtual Machine 4',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 5,
                    status:'Running',
                    name:'Virtual Machine 5',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                }];
            return mockData;
        };





        return {
            getVMDetail: getVMDetail,
            getVMMockData:getVMMockData
        };
    }


})();