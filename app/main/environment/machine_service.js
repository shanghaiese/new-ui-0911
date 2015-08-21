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
            getVMDetail: getVMDetail,
            getThead: getThead,
            transDetailForDis:transDetailForDis,
            transMemFromMB2GB: transMemFromMB2GB,
            transMemFromGB2MB: transMemFromGB2MB
        };

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
        }

        //mock data for Table Body
        function getVMDetail() {
            return Restangular.all('admin/virtual-machines').getList();
        }

        function updateVMDetail() {

        }

        /*mock data for vm detail information tab*/
        function transDetailForDis(vmFromAPI) {
            var result =[];
            var temp={};
            angular.forEach(vmFromAPI, function(obj, key)
            {
                 temp = 
                {
                    "Name":       obj.name,
                    "Description":obj.description,
                    "iLab ID":         obj.id,
                    "Power":      (obj.power === 0) ? "Stop":"Running",
                    "Config":     obj.cpus + "CPU," + obj.mem

                };
                result.push(temp);
            });
            return result;
        }

        function transMemFromMB2GB(mb) {
            return Math.floor(mb / 1024 * 100) / 100;
        }

        function transMemFromGB2MB(gb) {
            return gb*1024;
        }

        return machinesData;
    }
})();
