/**
 * Created by luyongjx on 7/7/2015.
 */
(function() {
    'use strict';

    angular
        .module('ilab')
        .controller('VMBasicCtrl',  VMBasicCtrl);

    VMBasicCtrl.$inject = ['basicPage'];

    function VMBasicCtrl(basicPage){
        var that = this;
        that.detailInfo = [];

        var detailInfoRuleList = [{
            machineType:'VM',
            titleName:'vmName',
            status:'statusDisPlay',
            attributeList: [
                { Name: 'Description', Key: 'vmDescription' },
                { Name: 'Config', Key: 'vmConfig' },
                { Name: 'IP', Key:'vmIP'},
                { Name: 'Network', Key: 'vmSubnet' }]
        },{
            machineType:'PM',
            titleName:'pmName',
            status:'statusDisPlay',
            attributeList: [
            { Name: 'Description', Key: 'pmDescription' }]
        }];



        activate();
        function activate(){
            that.templateData = setVMtemplate(basicPage);
        }

        function setVMtemplate(){
            var vmMockData = basicPage.getVMMockData();

            angular.forEach(vmMockData, function (machine) {
                //get data compare with template
                var detailTmp = {machineType:'VM', titleName:'', status:'', attributeList:[]}; // @todo PM will add another list
                var tempRule = $.grep(detailInfoRuleList, function(rule){
                    return detailTmp.machineType == rule.machineType;
                });

                //only get machine type is VM
                if(tempRule.length > 0){
                    that.bindData = $.grep(tempRule, function(tmp){
                        console.log(machine);
                        tempRule.machineType = machine.machineType;
                        tempRule.status = machine.statusDisplay;
                        tempRule.titleName = machine.vmName;

                    });
                    angular.forEach(tempRule.attributesList,function (att){
                        var attributeDetail = { Name: '', Value: '' };
                        attributeDetail.Name = att.Name;
                        attributeDetail.Vakue = att.Key;

                        //att.Key = machine.vmDescription;
                        //att.Key = machine.vmConfig;
                        //att.Key = machine.vmIP;
                        //att.Key = machine.vmSubnet;

                    });

                    that.templateData = tempRule;
                    console.log(that.templateData.titleName);
                }



            });
            return that.templateData;
        }



        var getVMs = {
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