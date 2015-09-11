ddescribe('enviromrnt controller', function() {
	
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


    var scope, ctrlEnv, $rootScope;

    beforeEach(function() {
        module('ilab');
        module('templates');
    });

    

	beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Restangular, _machine_) {		       
		httpBackend = _$httpBackend_;  
        restangular = Restangular;    
        machine = _machine_;
        envScope = $rootScope.$new();
		ctrlEnv = $controller('EnvCtrl', {
            '$scope': envScope, 
            _env : vmFakeData,
            _envs: ''
        });      
	}));

	it('should have a EnvCtrl controller bind the scope data', function() {
		expect(ctrlEnv).not.toBeUndefined();
        expect(envScope).not.toBeUndefined();
        expect(ctrlEnv.env).not.toBeUndefined();
	});

    describe('test the vm operation function:', function() {
        beforeEach(inject(function(Restangular) {
            //ctrlEnv.env = vmFakeData;
            oneVMToPowerOff = Restangular.one("virtual-machines", 3633301); //powerStatus=1
            oneVMToPowerOn = Restangular.one("virtual-machines", 3633401); //powerStatus=0 
            oneVMPowerOffSuccess = {
                id:3633301,
                powerStatus:"OFF",
                status:"RUNNING"    
            };
            oneVMSuspendSuccess  = {
                id:3633401,
                powerStatus:"PAUSED",
                status:"RUNNING"   
            };
            oneVMPowerOnSuccess  = {
                id:3633401,
                powerStatus:"ON",
                status:"RUNNING"   
            };
            oneVMPowerOnFail = {
                id:3633401,
                powerStatus:"OFF",
                status:"RUNNING"
            };      
        }));
        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

         it('should powerStatus off the vm after powerStatus off', function() {
            console.log(oneVMToPowerOff);
            httpBackend.expectPOST('/services/api/virtual-machines/3633301/powerOff').respond(oneVMPowerOffSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOff, 'powerOff');
            });

            httpBackend.flush();
            expect(oneVMToPowerOff.powerStatus).toEqual("OFF");
        });

        it('should powerStatus on the vm after powerStatus on', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerOn').respond(oneVMPowerOnSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOn, 'powerOn');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.powerStatus).toEqual("ON");
        });
        it('should suspend the vm after suspend', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerPause').respond(oneVMSuspendSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOn, 'powerPause');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.powerStatus).toEqual("PAUSED");
        });
        it('should powerStatus on the vm after restart', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerReset').respond(oneVMPowerOnSuccess);
            scope.$apply(function() {
                ctrl.power(oneVMToPowerOn, 'powerReset');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.powerStatus).toEqual("ON");
        });
    });

    describe('when list of VM load in overview page', function(){
        it('should no need for paging when vm is less than 12', function(){

        });
        it('should paging when vm is more than 12', function(){

        });

    })
});
