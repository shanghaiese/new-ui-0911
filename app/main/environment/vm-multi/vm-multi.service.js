/** @Display the all environment list in multiple pages
    @add by yufan
 */
(function() {
    'use strict';

   angular
        .module('ilabService')
        .factory('multiPage',(function(){
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
                },{
                    id: 6,
                    status:'Running',
                    name:'Virtual Machine 6',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 7,
                    status:'Stopped',
                    name:'Virtual Machine 7',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 8,
                    status:'Running',
                    name:'Virtual Machine 8',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 9,
                    status:'Suspend',
                    name:'Virtual Machine 9',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 10,
                    status:'Running',
                    name:'Virtual Machine 0',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 11,
                    status:'Suspend',
                    name:'Virtual Machine 1',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 12,
                    status:'Running',
                    name:'Virtual Machine 2',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 13,
                    status:'Running',
                    name:'Virtual Machine 13',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 14,
                    status:'Suspend',
                    name:'Virtual Machine 14',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                },{
                    id: 15,
                    status:'Running',
                    name:'Virtual Machine 15',
                    description:'This a test VM',
                    config:'2CPU,4G',
                    ip:'10.239.00.01',
                    network:'Subnet1'
                }];


              function chunk(arr, size) {
                    var newArr = [];
                    for (var i=0; i<arr.length; i+=size) {
                        newArr.push(arr.slice(i, i+size));
                    }
                    return newArr;
                }

               mockData = chunk(mockData,12);
           

              return {
                getVMDetail: getVMDetail,

                MultiVMMockData: function(){
                    return mockData;
                        }
            };
                })
        );
})();
