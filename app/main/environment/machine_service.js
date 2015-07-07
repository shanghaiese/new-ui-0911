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
            var getVMDetail = function() {
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


        var createVM = function(name, tpl, env, attr) {
            return Machines.createVM({
                displayName: name,
                machineTemplate: 'VMT22401',
                environment: env,
                attributes: attr
            }).$promise;
        };

        var getMachineFromGroupInEnv = function(projectID, EnvID) {
            return Machines.query({
                environment: EnvID
            }).$promise;
        };

        var getMachineAttributes = function(vmId) {
            return Machines.get({
                machineID: vmId
            }).$promise;
        };

        var powerOn = function(vmId) {
            return Machines.powerOn({
                machineID: vmId
            }, null).$promise;
        };
        var powerOff = function(vmId) {
            return Machines.powerOff({
                machineID: vmId
            }, null).$promise;
        };
        var deleteVM = function(vmId) {
            return Machines.deleteVM({
                machineID: vmId
            }).$promise;
        };
        var openConsole = function(vmId) {
            return Machines.openConsole({
                machineID: vmId
            }, null).$promise;
        };
        


        return machinesData;
    }
})();
