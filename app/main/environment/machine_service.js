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

    
    function machineService() {

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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
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
                        "label": "3638301_NIC5",
                        "ip": "169.254.186.245"
                    }],
                    "vmm": "10.223.136.221",
                    "disk1": "TBD"
                }, {
                    "id": 3638306,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638307,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638308,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638309,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638310,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638311,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638312,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638313,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638314,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638315,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638316,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638317,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638318,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638319,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638320,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638321,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638322,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638323,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638324,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638325,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638326,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638327,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638328,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638329,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638330,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638331,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }, {
                    "id": 3638332,
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
                    }, {
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.243"
                    },{
                        "interface": 2,
                        "label": "3638301_NIC2",
                        "ip": "169.254.186.247"
                    }],
                    "vmm": "10.223.136.211",
                    "disk1": "TBD"
                }
            ];
            
            return detail;

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
