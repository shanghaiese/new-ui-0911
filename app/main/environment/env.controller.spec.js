ddescribe('EnvCtrl', function() {
	var scope, ctrl, $rootScope;
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
    // var envFakeData = [{
    //     "id": 2069501,
    //     "name": "defect test",
    //     "groupId": 1123301,
    //     "deployedDate": "Jan  1 1900 05:05:17:497PM",
    //     "expiryDate": "Sep 20 2015 12:00:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Gopalakrishnan, Rengarajan",
    //     "maxAllowedVms": 3360 ,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // },
    // {
    //     "id": 2088301,
    //     "name": "Environment Name",
    //     "groupId": 1123301,
    //     "deployedDate": "Aug 25 2015 01:29:22:910AM",
    //     "expiryDate": "Aug 19 2015 06:04:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Wang, Yufan",
    //     "maxAllowedVms": 3360 ,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // },
    // {
    //     "id": 2088401,
    //     "name": "Environment Name",
    //     "groupId": 1123301,
    //     "deployedDate": "Aug 25 2015 01:29:38:830AM",
    //     "expiryDate": "Aug 19 2015 06:04:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Wang, Yufan",
    //     "maxAllowedVms": 3360 ,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // },
    // {
    //     "id": 2088501,
    //     "name": "Environment Name",
    //     "groupId": 1123301,
    //     "deployedDate": "Aug 25 2015 01:30:47:977AM",
    //     "expiryDate": "Aug 19 2015 06:04:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Wang, Yufan",
    //     "maxAllowedVms": 3360,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // },
    // {
    //     "id": 2088601,
    //     "name": "Environment Name",
    //     "groupId": 1123301,
    //     "deployedDate": "Aug 25 2015 01:31:20:233AM",
    //     "expiryDate": "Aug 19 2015 06:04:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Wang, Yufan",
    //     "maxAllowedVms": 3360 ,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // },
    // {
    //     "id": 2088701,
    //     "name": "Environment Name",
    //     "groupId": 1123301,
    //     "deployedDate": "Aug 25 2015 01:38:30:830AM",
    //     "expiryDate": "Aug 19 2015 06:04:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Wang, Yufan",
    //     "maxAllowedVms": 3360,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // },
    // {
    //     "id": 2088801,
    //     "name": "Environment Name",
    //     "groupId": 1123301,
    //     "deployedDate": "Aug 25 2015 01:45:44:887AM",
    //     "expiryDate": "Aug 19 2015 06:04:00:000AM",
    //     "expiryNotificationDate": null,
    //     "owner": "Wang, Yufan",
    //     "maxAllowedVms": 3360,
    //     "summary": [{
    //             "virtualMachines": 1,
    //             "physicalMachines":2,
    //             "networks":2,
    //             "users":1
    //         }]
    // }];

    beforeEach(module('ilab'));
    beforeEach(module('templates'));

	beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $q, Restangular) {
		scope = $rootScope.$new();
		httpBackend = _$httpBackend_;
        restangular = Restangular;
        q = $q;
		ctrl = $controller('EnvCtrl', {
            '$scope': scope, 
            _env : vmFakeData,
            _vms : vmFakeData.virtualMachines
        }); 
        
	}));

	it('should have a EnvCtrl controller', function() {
		expect(ctrl).not.toEqual(null);
	});

    describe('test the vm operation function', function() {
        beforeEach(function(){
            testVmToPowerOff = ctrl.vms[0];
            testVmToPowerOn = ctrl.vms[1];
            off = {power: 0};
            suspend ={power: 2};
            on = {power: 1};
            failOn ={power: 0};
        });
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should power off the vm after power off', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633301/powerOff', 3633301).respond(off);
            httpBackend.whenGET('/services/api/virtual-machines/3633401').respond(200,{
                "power":0,
                "disable":0,
                "locked":false
            });          
            scope.$apply(function(){
                ctrl.power(testVmToPowerOff,'powerOff');
            });          
            httpBackend.flush();
            expect(testVmToPowerOff.power).toEqual(0);
            expect(testVmToPowerOff.status).toEqual('Stopped');
        });

        it('should power on the vm after power on', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerOn', 3633401).respond(on);
            httpBackend.whenGET('/services/api/virtual-machines/3633401').respond(200,{
                "power":1,
                "disable":4,
                "locked":true
            });  
            scope.$apply(function(){
                ctrl.power(testVmToPowerOn,'powerOn');
            });
            httpBackend.flush();
            expect(testVmToPowerOn.power).toEqual(1);
            //expect(vm.status).toEqual('Running');
        });
        it('should suspend the vm after suspend', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerPause', 3633401).respond(suspend);
            httpBackend.whenGET('/services/api/virtual-machines/3633401').respond(200,{
                "power":1,
                "disable":4,
                "locked":true
            });  
            scope.$apply(function(){
                ctrl.power(testVmToPowerOn,'powerPause');
            });
            httpBackend.flush();
            expect(testVmToPowerOn.power).toEqual(2);
            //expect(vm.status).toEqual('Suspended');
        });
        it('should power on the vm after restart', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/363401/powerReset', 3633401).respond(200);
            httpBackend.whenGET('/services/api/virtual-machines/3633401').respond(200,{
                "power":1,
                "disable":4,
                "locked":true
            });  
            scope.$apply(function(){
                ctrl.power(testVmToPowerOn,'powerReset');
            });
            httpBackend.flush();
            expect(testVmToPowerOn.power).toEqual(1);
        });
    });
});
