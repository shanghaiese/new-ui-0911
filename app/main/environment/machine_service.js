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

    machineService.$inject = ['$resource', 'API_URL'];

    function machineService(resource, url) {

        var machinesData = {
            Machines: Machines,
            createVM: createVM,
            getMachineFromGroupInEnv: getMachineFromGroupInEnv,
            getMachineAttributes: getMachineAttributes,
            powerOn: powerOn,
            powerOff: powerOff,
            deleteVM: deleteVM,
            getVMDetail: getVMDetail,
            getThead:getThead,
            openConsole: openConsole
        };

        var Machines = resource(url + 'machines/:machineID', null, {
            powerOn: {
                method: 'PUT',
                url: url + 'machines/:machineID/powerOn'
            },
            openConsole: {
                method: 'PUT',
                url: url + 'machines/:machineID/console'
            },
            powerOff: {
                method: 'PUT',
                url: url + 'machines/:machineID/powerOff'
            },
            deleteVM: {
                method: 'DELETE'
            },
            configVM: {
                method: 'PUT'
            },
            createVM: {
                method: 'POST',
                url: url + 'machines/virtual'
            }
        });
        //mock data
        function getVMDetail() {
            var detail = [{ 
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
        },{
            id: 'VM007',
            name: 'vmm',
            IP: '10.192.168.5',
            displayName: "VMM02",
            configuration: '2CPU,4G' 
        }];
            return detail;

        }

        function getThead() {
            var thead = [{
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
            return thead;
        }

        function createVM(name, tpl, env, attr) {
            return Machines.createVM({
                displayName: name,
                machineTemplate: 'VMT22401',
                environment: env,
                attributes: attr
            }).$promise;
        }

        function getMachineFromGroupInEnv(projectID, EnvID) {
            return Machines.query({
                environment: EnvID
            }).$promise;
        }

        function getMachineAttributes(vmId) {
            return Machines.get({
                machineID: vmId
            }).$promise;
        }

        function powerOn(vmId) {
            return Machines.powerOn({
                machineID: vmId
            }, null).$promise;
        }
        function powerOff(vmId) {
            return Machines.powerOff({
                machineID: vmId
            }, null).$promise;
        }
        function deleteVM(vmId) {
            return Machines.deleteVM({
                machineID: vmId
            }).$promise;
        }
        function openConsole(vmId) {
            return Machines.openConsole({
                machineID: vmId
            }, null).$promise;
        }
        


        return machinesData;
    }
})();
