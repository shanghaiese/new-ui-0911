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
            getThead: getThead,
            openConsole: openConsole,
            transDetailForDis:transDetailForDis
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
        //mock data for Table Head
        function getThead() {
            var thead = [{
                display: 'Name',
                name: 'name'
            }, {
                display: 'IP',
                name: 'ip'
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

        //mock data for Table Body
        function getVMDetail() {
            var detail = [{
                    "id": 3638301,
                    "path": "/vmfs/volumes/.../vm1.vmx",
                    "name": '1ilabclient01_win2008R2_with_agent',
                    "cpus": 2,
                    "mem": 1024,
                    "power": 0,
                    "maxcpus": 32,
                    "maxmem": 1035264,
                    "minmem": 512,
                    "os": "windows7srv-64",
                    "created_date":  "2015-06-01",
                    "disable": 0,
                    "description": "description",
                    "locked": false,
                    "network": [{
                        "interface": 1,
                        "label": "3638301_NIC1",
                        "ip": "169.254.186.241"
                    }],
                    "vmm": "10.223.136.232",
                    "disk1": "TBD"
                }, {
                    "id": 3638302,
                    "path": "/vmfs/volumes/.../vm1.vmx",
                    "name": '2ilabclient02_win2008R2_with_agent',
                    "cpus": 2,
                    "mem": 1024,
                    "power": 0,
                    "maxcpus": 32,
                    "maxmem": 1035264,
                    "minmem": 512,
                    "os": "windows7srv-64",
                    "created_date":  "2015-06-01",
                    "disable": 0,
                    "description": "description",
                    "locked": false,
                    "network": [{
                        "interface": 1,
                        "label": "3638301_NIC1",
                        "ip": "169.254.186.242"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638303,
                    "path": "/vmfs/volumes/.../vm1.vmx",
                    "name": '3ilabclient03_win2008R2_with_agent',
                    "cpus": 2,
                    "mem": 1024,
                    "power": 0,
                    "maxcpus": 32,
                    "maxmem": 1035264,
                    "minmem": 512,
                    "os": "windows7srv-64",
                    "created_date":  "2015-06-01",
                    "disable": 0,
                    "description": "description",
                    "locked": false,
                    "network": [{
                        "interface": 1,
                        "label": "3638301_NIC1",
                        "ip": "169.254.186.243"
                    }],
                    "vmm": "10.223.136.243",
                    "disk1": "TBD"
                }, {
                    "id": 3638304,
                    "path": "/vmfs/volumes/.../vm1.vmx",
                    "name": '4ilabclient04_win2008R2_with_agent',
                    "cpus": 2,
                    "mem": 1024,
                    "power": 0,
                    "maxcpus": 32,
                    "maxmem": 1035264,
                    "minmem": 512,
                    "os": "windows7srv-64",
                    "created_date": "2015-06-01",
                    "disable": 0,
                    "description": "description",
                    "locked": false,
                    "network": [{
                        "interface": 1,
                        "label": "3638301_NIC1",
                        "ip": "169.254.186.244"
                    }],
                    "vmm": "10.223.136.223",
                    "disk1": "TBD"
                }, {
                    "id": 3638305,
                    "path": "/vmfs/volumes/.../vm1.vmx",
                    "name": '5ilabclient05_win2008R2_with_agent',
                    "cpus": 2,
                    "mem": 1024,
                    "power": 0,
                    "maxcpus": 32,
                    "maxmem": 1035264,
                    "minmem": 512,
                    "os": "windows7srv-64",
                    "created_date":  "2015-06-01",
                    "disable": 0,
                    "description": "description",
                    "locked": false,
                    "network": [{
                        "interface": 1,
                        "label": "3638301_NIC1",
                        "ip": "169.254.186.245"
                    }],
                    "vmm": "10.223.136.221",
                    "disk1": "TBD"
                }
            ];
            
            return detail;

        }

        /*mock data for vm detail information tab*/
        function transDetailForDis() {
            var vmFromAPI = getVMDetail();
            var result =[];
            for(var item in vmFromAPI)
            { 
                var temp = 
                {
                    "Name":       item.name,
                    "Description":item.description,
                    "iLab ID":    item.id,
                    "Power":      (item.power === 0) ? "Stop":"Running",
                    "Config":     item.cpus + "CPU," + item.mem

                };

                result.push(temp);

            }
            console.log(result);
            return result;
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
