/**
 * @ngdoc service
 * @name ilabService.machine
 * @description machine
 *
 * @requires $resource
 * @requires API_URL
 *
 */
(function() {
    'use strict';

    angular
        .module('ilabService')
        .factory('machine', machineService);

    machineService.$inject = ['Restangular'];

    function machineService(Restangular) {

        var machinesData = {
            getVMList: getVMList,
            getEnvNetworks: getEnvNetworks,
            getThead: getThead,
            getVMDetail: getVMDetail,
            updateVMDetail: updateVMDetail,
            saveVMTpl: saveVMTpl,
            transDetailForDis: transDetailForDis,
            transMemFromMB2GB: transMemFromMB2GB,
            transMemFromGB2MB: transMemFromGB2MB
        };

        var networksList;

        //mock data for Table Head
        function getThead() {
            var thead = [{
                display: 'Name',
                name: 'name'
            }, {
                display: 'IP',
                name: 'network[0].ip'
            }, {
                display: 'Configuration',
                name: 'cpus'
            }, {
                display: 'Connect',
                name: 'console'
            }, {
                display: 'Power',
                name: 'statusOrderPriority'
            }];
            return thead;
        };

        function getEnvNetworks() {
            var networks = Restangular.one("environments", 2068901);
            networksList = networks.get({
                expand: 'networks'
            });
            return networksList;
        };

        //get virtual machine list by calling api
        function getVMList() {
            var env = Restangular.one("environments", 2068901);
            var virtualMachineList = env.get({
                expand: 'virtualMachines'
            });
            return virtualMachineList;
            //return Restangular.all('admin/virtual-machines').getList();
        };

        function getVMDetail(vmid) {
            var vmDetailInfo = Restangular.one("virtual-machines", vmid).get();
            return vmDetailInfo;
        };

        function updateVMDetail(vmid, configTmp) {
            var vm = Restangular.one("virtual-machines", vmid).get();
            vm.then(function(VmNeedToUpdate) {
                VmNeedToUpdate.name = configTmp.name;
                VmNeedToUpdate.cpus = configTmp.CPU.NumOfCPU;
                var gb = parseInt(configTmp.memory.memory);
                VmNeedToUpdate.mem = transMemFromGB2MB(gb);
                angular.forEach(VmNeedToUpdate.network, function(obj, key) {
                    var idx = parseInt(obj.interface) - 1;
                    obj.label = configTmp.network[idx].label;
                });  
                //var vmFound = _.find(VmNeedToUpdate, function(vmFound) {return vmFound.id == vmid;});
                VmNeedToUpdate.put();
            });
        };

        function saveVMTpl(vmid, saveTpl) {
            var vm = Restangular.one("virtual-machines", vmid).get();
            vm.then(function(vmTplNeedToSave) {
                vmTplNeedToSave.post('saveAsTemplate', saveTpl). then(function() {
                    console.log("save Success");
                }, function() {
                    console.log("save Failed");
                });
            });
        };

        /*mock data for vm detail information tab*/
        function transDetailForDis(vmFromAPI) {
            var result = [];
            var temp = {};
            angular.forEach(vmFromAPI, function(obj, key) {
                temp = {
                    "Name": obj.name,
                    "Description": obj.description,
                    "iLab ID": obj.id,
                    "Power": (obj.power === 0) ? "Stop" : "Running",
                    "Config": obj.cpus + "CPU," + obj.mem

                };
                result.push(temp);
            });
            return result;
        };

        function transMemFromMB2GB(mb) {
            return Math.floor(mb / 1024 * 100) / 100;
        };

        function transMemFromGB2MB(gb) {
            return gb * 1024;
        };

        return machinesData;
    }
})();
