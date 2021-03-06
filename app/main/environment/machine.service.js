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

    machineService.$inject = ['Restangular', 'vmService'];

    function machineService(Restangular, vmService) {

        var machinesData = {
            getThead: getThead,
            getVMDetail: getVMDetail,
            getOneVmForOperation:getOneVmForOperation,
            deleteVM:deleteVM,
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
                name: 'name',
                enabled: true,
                readOnly: true
            }, {
                display: 'IP',
                name: 'network[0].ip',
                enabled: true,
                readOnly: false
            }, 
            {
                display: 'Network',
                name: 'network[0].label',
                enabled: false,
                readOnly: false
            }, {
                display: 'Configuration',
                name: 'cpus',
                enabled: true,
                readOnly: false
            },
            {
                display: 'Creator',
                name: 'creator',
                enabled: false,
                readOnly: false
            },
            {
                display: 'Description',
                name: 'description',
                enabled: false,
                readOnly: false
            }, {
                display: 'Connect',
                name: 'console',
                enabled: true,
                readOnly: false
            }, 
            {
                display: 'Status',
                name: 'statusDisplay',
                enabled: true,
                readOnly: false
            }];
            return thead;
        }


        function getVMDetail(vmid) {
            return Restangular.one("virtual-machines", vmid).get();
        }

        function getOneVmForOperation(vmid) {
            return Restangular.one("virtual-machines", vmid);
        }

        function deleteVM(vmid) {
            return Restangular.one("virtual-machines", vmid).remove();
        }

        function saveVMTpl(vmid, saveTpl) {
            var vm = Restangular.one("virtual-machines", vmid).get();
            vm.then(function(vmTplNeedToSave) {
                vmTplNeedToSave.post('saveAsTemplate', saveTpl).then(function() {
                    description.log("save Success");
                }, function() {
                    console.log("save Failed");
                });
            });
        }

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
        }

        function transMemFromMB2GB(mb) {
            return Math.floor(mb / 1024 * 100) / 100;
        }

        function transMemFromGB2MB(gb) {
            return gb * 1024;
        }

        return machinesData;
    }
})();
