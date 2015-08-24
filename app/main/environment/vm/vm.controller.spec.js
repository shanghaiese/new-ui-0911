describe('vms controller', function() {
	var scope, ctrl;
	var vmFakeData = {
    "id": 2068901,
    "name": "4.7_switch_test",
    "groupId": 1123201,
    "deployedDate": "Jan  1 1900 05:05:17:480PM",
    "expiryDate": "Feb  2 2016 12:00:00:000AM",
    "expiryNotificationDate": null,
    "owner": "Kumari, Neetu",
    "maxAllowedVms": 10,
    "virtualMachines": [
        {
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
            "network": [
                {
                    "interface": 1,
                    "label": "3633301_NIC1",
                    "ip": "10.223.136.203",
                    "subnet": []
                }
            ],
            "vmm": "10.223.136.241",
            "disk1": "TBD"
        },
        {
            "id": 3633401,
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
            "network": [
                {
                    "interface": 1,
                    "label": "3633401_NIC1",
                    "ip": "",
                    "subnet": []
                }
            ],
            "vmm": "sathiya",
            "disk1": "TBD"
        }]};

	beforeEach(module('ilab'));
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('VMCtrl', {'$scope': scope, _vms : vmFakeData});
	}));

	it('should have a VMCtrl controller', function() {
		expect(ctrl).not.toEqual(null);

	});

	it('should select all checkbox by toggleCheckAll function', function() {
		ctrl.selectedVMs = [];
		var toggle = ctrl.toggleCheckAll();
		expect(ctrl.selectedVMs.length).toEqual(ctrl.VMs.length);
	});

});