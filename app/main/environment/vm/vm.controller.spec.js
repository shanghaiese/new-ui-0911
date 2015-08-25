ddescribe('vms controller', function() {
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
					          "ip": "10.223.136.203"
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
					          "ip": ""
					        }
					      ],
					      "vmm": "sathiya",
					      "disk1": "TBD"
					    }
					  ]
					};
					
    var scope, ctrl;
	beforeEach(function() {
        module('ilab');
        module('ilabService');
    });

    beforeEach(module('ilab'));
    beforeEach(inject(function($rootScope, $controller, $modal) {
        scope = $rootScope.$new();
        ctrl = $controller('VMCtrl', {
            '$scope': scope,
            _vms: vmFakeData
        });
        modalDialog = $modal;
		machine = _machine_;
		ctrl = $controller('VMCtrl', {$scope: scope, _vms: vmFakeData, machine: machine});
		spyOn(machine, 'transMemFromMB2GB').and.callFake(function(mb) {
			return Math.floor(mb / 1024 * 100) / 100;
		});
        spyOn(modalDialog, 'open').and.callThrough();
    }));
    


    it('should have a VMCtrl controller', function() {
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

    it('should select all checkbox by toggleCheckAll function', function() {
        ctrl.selectedVMs = [];
        var toggle = ctrl.toggleCheckAll();
        expect(ctrl.selectedVMs.length).toEqual(ctrl.VMs.length);
	});

	describe('with the given vmid number', function() {
		//first load _vms->ctrl.VMs
		var vmid = 3633301;
		beforeEach(function() {
			ctrl.loadVMList();
		});
		//spyOn(ctrl, 'getVMById').and.CallThrough();

		//after loading, ctrl.VMs contains 2 vms in an array
		it('should ctrl.VMs be array', function() {
			expect(ctrl.VMs).toEqual(jasmine.any(Array));
		});
		it('should have 2 virtual machines', function() {
			expect(ctrl.VMs.length).toEqual(2);
		});

		it('should load vmTemp', function() {
			var testNet = {
					        "interface": 1,
					        "label": "3633301_NIC1",
					       	"ip": "10.223.136.203"
					      };

			ctrl.getVMById(vmid);
			expect(ctrl.vmTemp.id).toEqual(3633301);
			expect(ctrl.vmTemp.name).toBe('ilabredis-devba');
			expect(ctrl.vmTemp.description).toBeNull();
			expect(ctrl.vmTemp.CPU.NumOfCPU).toEqual(1);
			expect(ctrl.vmTemp.memory.memory).toBe('2G');
			expect(ctrl.vmTemp.CPU.idx).toEqual(0);

			expect(ctrl.vmTemp.network).toEqual(jasmine.any(Array));
			expect(ctrl.vmTemp.network).toContain(testNet);
		});

		describe('after loadVMs and showVmEdit', function() {
			beforeEach(function() {
				ctrl.showVmEdit(vmid, true);
			});

			it('should loaded vmSaveTemp for first click to expand', function() {
				expect(ctrl.showPage).toEqual(vmid);
				expect(ctrl.saveTemp.name).toBe('ilabredis-devba');
				expect(ctrl.vmTemp).toEqual(ctrl.configTmp);
				expect(ctrl.tplConfig[0].interface).toEqual('1');
				expect(ctrl.tplConfig[0].label).toBe('3633301_NIC1');
			});
	
			it('should close the expanded table if click 2 times', function() {
				ctrl.showVmEdit(vmid, true);
				expect(ctrl.showPage).toEqual(0);
			});
			
			it('should change the configTmp network', function() {
				network = {
	    			  		"vlanId": 2347301,
					     	"name": "103_Cisco-SH-Telnet",
					      	"vlan": 103,
					      	"isDynamic": 0,
					      	"subnet": 6
					      };
				ctrl.selectNetwork(0, network);
				expect(ctrl.configTmp.network[0].label).toEqual("103_Cisco-SH-Telnet");
			});

			it('should change the memory if click', function() {
				memory= {
						  memory: "4G"
						};
				ctrl.selectMemory(memory);
				expect(ctrl.configTmp.memory.memory).toBe('4G');
			});

			it('should change the cpu if click', function() {
				cpu = '2';
				ctrl.selectCPU(cpu);
				expect(ctrl.configTmp.CPU).toBe('2');
			});

			it('should revert any change on configTmp to the origin', function() {
				ctrl.configTmp.name = 'change1';
				ctrl.configTmp.description = 'change2';
				ctrl.configTmp.id = 'change3';
				ctrl.configTmp.CPU.NumOfCPU = 'change4';
				ctrl.configTmp.memory.memory = 'change5';
				ctrl.configTmp.network = [];
				ctrl.cancelConfig(vmid);
				expect(ctrl.configTmp.name).toBe('ilabredis-devba');
				expect(ctrl.configTmp).toEqual(ctrl.vmTemp);
			});

			it('should revert any change on saveTemp to the origin', function() {
				ctrl.saveTemp.name = 'change6';
				ctrl.saveTemp.modeSaveDisk.saveMode = 'copy';
				ctrl.saveTemp.modeSaveDisk.diskMode = 'clone';
				ctrl.cancelConfig(vmid);
				expect(ctrl.saveTemp.name).toBe('ilabredis-devba');
				expect(ctrl.saveTemp.modeSaveDisk.saveMode).toBe('convert');
				expect(ctrl.saveTemp.modeSaveDisk.diskMode).toBe('chain');
			});

			it('should increase the number of Template', function() {
				
			});
		});
    });

    it('should open modal dialog when openDeleteDialog()', function() {
        ctrl.openDeleteDialog();
        expect(modalDialog.open).toHaveBeenCalledWith({
            templateUrl: 'main/templates/vmDeleteDialog.html',
            controller: 'ModalInstanceCtrl',
            animation: false
        });

    });

});
