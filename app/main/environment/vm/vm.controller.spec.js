/*describe('vms controller', function() {
	var scope, ctrl;

	beforeEach(module('ilab'));
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('VMsCtrl', {'$scope': scope});
	}));

	it('should have a VMsCtrl controller', function() {
		expect(ctrl).not.toEqual(null);

	});

	it('should have VMs on load', function() {
		expect(ctrl.VMs).toEqual([
			{ 
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
        }]);
	});

	it('should have Thead on load', function() {
		expect(ctrl.thead).toEqual([
			{
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
        }]);
	});

	it('should select all checkbox by toggleCheckAll function', function() {
		ctrl.deleteVM.selectedVMs = [];
		var toggle = ctrl.toggleCheckAll();
		expect(ctrl.deleteVM.selectedVMs.length).toEqual(ctrl.VMs.length);
	});


});*/
