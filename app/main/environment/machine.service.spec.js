describe('machine service item with inline mock', function() {
    beforeEach(module('ilab'));

    var ctrl, mockService;

    beforeEach(module(function($provide) {
        mockService = {
            getVMDetail: function() {
                return [{
                    "id": 1,
                    "path": "/vmfs/volumes/ILAB_SAN_09/306841/269281-clone.vmx",
                    "name": "PEVH-VHO-1",
                    "cpus": 6,
                    "mem": 16384,
                    "power": 1,
                    "maxcpus": 8,
                    "maxmem": 261120,
                    "minmem": 512,
                    "os": "windows7srv-64",
                    "created_date": "Jan  1 1970 12:00:00:000AM",
                    "disable": 0,
                    "description": null,
                    "locked": false,
                    "network": [{
                        "interface": 1,
                        "label": "1_NIC1",
                        "ip": "10.88.16.69"
                    }],
                    "vmm": "pvms1113.pdx.intel.com",
                    "disk1": "TBD"
                }];
            }
        };

        $provide.value('machine', mockService);

    }));

    beforeEach(inject(function($controller) {
        ctrl = $controller('VMCtrl');
    }));

    it('should load mocked out items', function() {
        expect(ctrl.VMs).toEqual([{
            "id": 1,
            "path": "/vmfs/volumes/ILAB_SAN_09/306841/269281-clone.vmx",
            "name": "PEVH-VHO-1",
            "cpus": 6,
            "mem": 16384,
            "power": 1,
            "maxcpus": 8,
            "maxmem": 261120,
            "minmem": 512,
            "os": "windows7srv-64",
            "created_date": "Jan  1 1970 12:00:00:000AM",
            "disable": 0,
            "description": null,
            "locked": false,
            "network": [{
                "interface": 1,
                "label": "1_NIC1",
                "ip": "10.88.16.69"
            }],
            "vmm": "pvms1113.pdx.intel.com",
            "disk1": "TBD"
        }]);
    });
});
