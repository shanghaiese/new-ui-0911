/*describe('envBasic controller', function() {
    var vmFakeData = {
        "id": 2068901,
        "name": "4.7_switch_test",
        "groupId": 1123201,
        "deployedDate": "Jan  1 1900 05:05:17:480PM",
        "expiryDate": "Feb  2 2016 12:00:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Kumari, Neetu",
        "maxAllowedVms": 10,
        "virtualMachines": [{
            "id": 3633301,
            "env_id": 2068901,
            "path": "/vmfs/volumes/datastore1/ilabcontroller-devba10/ilabcontroller-devba10.vmx",
            "name": "ilabredis-devba",
            "cpus": 1,
            "mem": 2048,
            "power": 1,
            "maxcpus": 32,
            "maxmem": 1035264,
            "minmem": 256,
            "os": "ubuntu-64",
            "created_date": null,
            "disable": 0,
            "description": null,
            "locked": false,
            "network": [{
                "interface": 1,
                "label": "3633301_NIC1",
                "ip": "10.223.136.203"
            }],
            "vmm": "10.223.136.241",
            "disk1": "TBD"
        }, {
            "id": 3633401,
            "env_id": 2068901,
            "path": "/vmfs/volumes/shared_NFS/testnetwork/testnetwork.vmx",
            "name": "testnetwork",
            "cpus": 1,
            "mem": 2048,
            "power": 0,
            "maxcpus": 32,
            "maxmem": 1035264,
            "minmem": 512,
            "os": "rhel6-64",
            "created_date": null,
            "disable": 0,
            "description": null,
            "locked": true,
            "network": [{
                "interface": 1,
                "label": "3633401_NIC1",
                "ip": ""
            }],
            "vmm": "sathiya",
            "disk1": "TBD"
        }, {
            "id": 3633501,
            "env_id": 2068901,
            "path": "/vmfs/volumes/shared_NFS/testnetwork/testnetwork.vmx",
            "name": "testnetwork",
            "cpus": 1,
            "mem": 2048,
            "power": 2,
            "maxcpus": 32,
            "maxmem": 1035264,
            "minmem": 512,
            "os": "rhel6-64",
            "created_date": null,
            "disable": 0,
            "description": null,
            "locked": true,
            "network": [{
                "interface": 1,
                "label": "3633401_NIC1",
                "ip": ""
            }],
            "vmm": "sathiya",
            "disk1": "TBD"
        }, {
            "id": 3633601,
            "env_id": 2068901,
            "path": "/vmfs/volumes/shared_NFS/testnetwork/testnetwork.vmx",
            "name": "testnetwork",
            "cpus": 1,
            "mem": 2048,
            "power": 1,
            "maxcpus": 32,
            "maxmem": 1035264,
            "minmem": 512,
            "os": "rhel6-64",
            "created_date": null,
            "disable": 4,
            "description": null,
            "locked": true,
            "network": [{
                "interface": 1,
                "label": "3633401_NIC1",
                "ip": ""
            }],
            "vmm": "sathiya",
            "disk1": "TBD"
        }]
    };

    var scope, ctrl, $rootScope;

    beforeEach(function() {
        module('ilab');
        module('ilabService');
    });

    beforeEach(inject(function($rootScope, $controller, _machine_, Restangular, _$httpBackend_, $q) {
        scope = $rootScope.$new();
        httpBackend = _$httpBackend_;
        restangular = Restangular;
        q = $q;
        
        ctrl = $controller('EnvCtrl', {
            '$scope': scope,
            _env:vmFakeData,
        });
        
        machine = _machine_;
        
        it('should have a EnvCtrl controller', function() {
            expect(ctrl).not.toEqual(null);

        });

        it('should return true if vm is in ctrl.inOperationVMs', function() {
            ctrl.inOperationVMs = [{
                "id": 3633301,
                "env_id": 2068901

            }, {
                "id": 3633401,
                "env_id": 2068901
            }];
            var result = ctrl.vmIsInOperation(3633301);
            expect(result).toEqual(true);
        });
 

    var oneVM;
    conbsole.log(1);

    describe('test the vm operation function', function() {
        beforeEach(function() {
            oneVMToPowerOff = ctrl.vms[0]; //power=1
            oneVMToPowerOn = ctrl.vms[1]; //power=0
            oneVMPowerOffSuccess = {
                power: 0
            };
            oneVMSuspendSuccess = {
                power: 2
            };
            oneVMPowerOnSuccess = {
                power: 1
            };
            oneVMPowerOnFail = {
                power: 0
            };

        });
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should power off the vm after power off', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633301/powerOff', 3633301)
            .respond(oneVMPowerOffSuccess);

            scope.$apply(function() {
                ctrl.power(oneVMToPowerOff, 'powerOff');

            });
            
            httpBackend.flush();
            expect(oneVMToPowerOff.power).toEqual(0);
            expect(oneVMToPowerOff.statusDisplay).toEqual('Stopped');
        });

        it('should power on the vm after power on', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerOn', 3633401)
            .respond(oneVMPowerOnSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOn, 'powerOn');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.power).toEqual(1);
        });
        it('should suspend the vm after suspend', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerPause', 3633401)
            .respond(oneVMSuspendSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOn, 'suspend');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.power).toEqual(2);
        });
        it('should power on the vm after restart', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerReset', 3633401)
            .respond(oneVMPowerOnSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOn, 'restart');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.power).toEqual(1);
        });


    });
});*/