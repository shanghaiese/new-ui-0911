/*describe('vms controller', function() {
    var scope, ctrl;

    beforeEach(module('ilab'));
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('VMCtrl', {'$scope': scope});
    }));

    it('should have a VMCtrl controller', function() {
        expect(ctrl).not.toEqual(null);

    });

    it('should have VMs on load', function() {
        expect(ctrl.VMs).toEqual([{
            "id": 3638301,
            "path": "/vmfs/volumes/.../vm1.vmx",
            "name": '1ilabclient01_win2008R2_with_agent',
            "cpus": 1,
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
        }]);
    });

    it('should have Thead on load', function() {
        expect(ctrl.thead).toEqual([
            {
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
            }]);
    });

    it('should select all checkbox by toggleCheckAll function', function() {
        ctrl.deleteVM.selectedVMs = [];
        var toggle = ctrl.toggleCheckAll();
        expect(ctrl.deleteVM.selectedVMs.length).toEqual(ctrl.VMs.length);
    });


    it('should return virtual machine id when click the delete button',function() {
        var returnId = ctrl.openDeleteDialog('123');
        expect(returnId).toEqual('123');

    });


});*/