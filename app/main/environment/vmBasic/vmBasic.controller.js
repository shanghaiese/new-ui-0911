/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMBasicCtrl',  VMBasicCtrl);

    VMBasicCtrl.$inject = ['$scope'];

    function VMBasicCtrl($scope) {
        var that = this;
        that.VMs = [];
        that.ENVs = [];
        that.detailInfo = [];

        var detailInfoList = [{
            MachineType:'VM',
            TabName:'vmTabName',
            Status: [{ statusDispaly: 'Running'},
                { statusDispaly:'Stopped'},
                { statusDispaly:'Suspended'}],
            AttributeList: [{ Name: 'vmName', Key: 'vmName' },
                { Name: 'Description', Key: 'vmDescription' },
                { Name: 'Config', Key: 'vmConfig' },
                { Name: 'IP', Key:'vmIP'},
                { Name: 'Network', Key: 'vmSubnet' }]
        }/*,{
             MachineType:'PM',
             Status: [{ statusDispaly: 'Running'},
             { statusDispaly:'Stopped'},
             { statusDispaly:'Suspended'}],
             AttributeList: [{ Name: 'vmName', Key: 'vmName' },
             { Name: 'Description', Key: 'vmDescription' },
             { Name: 'Config', Key: 'vmConfig' },
             { Name: 'IP', Key:'vmIP'},
             { Name: 'Network', Key: 'vmSubnet' }]
         }*/];

        var mockData = [{
            MachineType:'VM',
            vmTabName:'VM1',
            statusDisplay:'Running',
            vmName:'Virtual Machine 1',
            vmDescription:'This a test VM',
            vmConfig:'2CPU,4G',
            vmIP:'10.239.00.01',
            vmNetwork:'Subnet1'
        }/*,{
            statusDisplay:'Running',
            vmName:'Virtual Machine 2',
            vmDescription:'This a test VM',
            vmConfig:'2CPU,4G',
            vmIP:'10.239.00.02',
            vmNetwork:'Subnet2'
        },{
            statusDisplay:'Suspend',
            vmName:'Virtual Machine 3',
            vmDescription:'This a test VM',
            vmConfig:'2CPU,4G',
            vmIP:'10.239.00.03',
            vmNetwork:'Subnet3'
        },{
            statusDisplay:'Running',
            vmName:'Virtual Machine 4',
            vmDescription:'This a test VM',
            vmConfig:'2CPU,4G',
            vmIP:'10.239.00.04',
            vmNetwork:'Subnet4'
        },{
            statusDisplay:'Stopped',
            vmName:'Virtual Machine 5',
            vmDescription:'This a test VM',
            vmConfig:'2CPU,4G',
            vmIP:'10.239.00.05',
            vmNetwork:'Subnet5'
        }*/];

        activate();
        function activate(){
            angular.forEach(mockData, function (machine) {
                var detailTmp = { MachineType:'VM', Status:[], AttributeList:[]};

                var tempRule = $.grep(detailInfoList, function(rule){
                    return (rule.MachineType == detailTmp.MachineType);
                });

                if(tempRule.length > 0){
                    detailTmp['Status'] = tempRule[0].Status;

                    angular.forEach(tempRule[0].AttributeList, function (attribute) {
                        var attributeDetail = { Name: '', Value: '' };
                        attributeDetail.Name = attribute.Name;
                        attributeDetail.Value = machine.Attributes[attribute.Key];
                        detailInfoList.AttributeList.push(attributeDetail);
                    });
                }
                that.detailInfo.push(detailTmp);
            });
        }

        var getVMs = {
            openDialog:openDialog,
            powerOperation:powerOperation
        };
        return getVMs;

        function powerOperation(vmId, op) {
            var vm_tmp = getVMById(vmId);
            if (op === 'powerOn' && vm_tmp.statusDisplay !== 'Running') {
                mixpanel.track("poweron_vm",{"target":vmId});
                that.inOperation.push(vmId);
                machine.powerOn(vmId).then(function() {
                    mixpanel.track("poweron_vm_success",{"target":vmId});
                    that.inOperation.splice(that.inOperation.indexOf(vmId));
                    vm_tmp.status = 'Booted to OS';
                    filterToDisplay();
                });
            } else if (op === 'powerOff' && vm_tmp.statusDisplay !== 'Stopped') {
                mixpanel.track("poweroff_vm",{"target":vmId});
                that.inOperation.push(vmId);
                machine.powerOff(vmId).then(function() {
                    mixpanel.track("poweroff_vm_success",{"target":vmId});
                    that.inOperation.splice(that.inOperation.indexOf(vmId));
                    vm_tmp.status = 'Powered Off';
                    filterToDisplay();
                });
            } else if (op === 'restart' && vm_tmp.statusDisplay !== 'Stopped') {
                mixpanel.track("restart_vm",{"target":vmId});
                that.inOperation.push(vmId);
                machine.powerOff(vmId).then(function() {
                    that.inOperation.splice(that.inOperation.indexOf(vmId));
                    machine.powerOn(vmId).then(function() {
                        mixpanel.track("restart_vm_success",{"target":vmId});
                        vm_tmp.status = 'Booted to OS';
                        filterToDisplay();
                    });
                });
            } else if (op === 'suspend' && vm_tmp.statusDisplay !== 'Stopped' && vm_tmp.statusDisplay !== 'Suspended') {
                mixpanel.track("suspend_vm",{"target":vmId});
                that.inOperation.push(vmId);
                interval(function() {
                    mixpanel.track("suspend_vm_success",{"target":vmId});
                    that.inOperation.splice(that.inOperation.indexOf(vmId));
                    vm_tmp.status = 'Disabled';
                    filterToDisplay();
                }, 2000, 1);
            } else {

            }
        }

        function getVMById(id) {
            var vm = null;
            angular.forEach(that.VMs, function(item, index) {
                if (item.id == id) {
                    vm = item;
                }
            });
            return vm;
        }
    }


})();