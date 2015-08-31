describe('vms controller', function() {
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

    var scope, ctrl, ctrlDelete, $rootScope;

    beforeEach(function() {
        module('ilab');
        module('ilabService');
    });

    beforeEach(inject(function($rootScope, $controller, _machine_, $modal, Restangular, _$httpBackend_, $q) {
        scope = $rootScope.$new();
        scope.Env = {
            activateTab: 1
        };
        httpBackend = _$httpBackend_;
        restangular = Restangular;
        q = $q;
        modalInstance = { // Create a mock object using spies
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: true
            }
        };
        ctrl = $controller('VmCtrl', {
            '$scope': scope,
            _env:vmFakeData,
            _vms:vmFakeData.virtualMachines
           // _vms: vmFakeData

        });
        ctrlDelete = $controller('ModalInstanceCtrl', {
            '$scope': scope,
            '$modalInstance': modalInstance
        });
        modalDialog = $modal;
        machine = _machine_;
        spyOn(machine, 'transMemFromMB2GB').and.callFake(function(mb) {
            return Math.floor(mb / 1024 * 100) / 100;
        });
        spyOn(modalDialog, 'open').and.callThrough();

        //spyOn(modalDialog, 'open').and.returnValue(fakeModal);
		spyOn(machine, 'transMemFromGB2MB').and.callFake(function(gb) {
            return gb * 1024;
		});
		spyOn(machine, 'updateVMDetail').and.callThrough();
		spyOn(machine, 'saveVMTpl').and.callFake(function(vmid, saveTpl) {
			return 'successSave';
		});
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

    describe('about checkbox selection', function() {
        beforeEach(function() {
            ctrl.loadVMList();
        });

        it('should select all checkbox by toggleCheckAll function', function() {
            ctrl.selectedVMs = [];
            var toggle = ctrl.toggleCheckAll();
            expect(ctrl.selectedVMs.length).toEqual(ctrl.VMs.length);
        });

        it('should diselect all checkbox by toggleCheckAll function when all machine checked', function() {
            ctrl.selectedVMs = ctrl.VMs;
            var toggle = ctrl.toggleCheckAll();
            expect(ctrl.selectedVMs.length).toEqual(0);
        });

        it('should disable the disableOption if one of vm is suspend', function() {
            ctrl.selectedVMs = ctrl.VMs;
            ctrl.disableSelection();
            expect(ctrl.disableOption === 'disabled');
        });
    });


    describe('change sorting function', function() {
        beforeEach(function() {
            ctrl.sort = {
                column: 'name',
                descending: false
            };
            ctrl.VMs = [{
                name: 'a',
                id: 2
            }, {
                name: 'b',
                id: 3
            }, {
                name: 'c',
                id: 1
            }];
        });

        it('should change sort when column is the same as sort.column', function() {
            ctrl.changeSorting('name');
            expect(ctrl.VMs).toEqual([{
                name: 'c',
                id: 1
            }, {
                name: 'b',
                id: 3
            }, {
                name: 'a',
                id: 2
            }]);
        });

        it('should sort new column when column is the not same as sort.column', function() {
            ctrl.changeSorting('id');
            expect(ctrl.VMs).toEqual([{
                name: 'c',
                id: 1
            }, {
                name: 'a',
                id: 2
            }, {
                name: 'b',
                id: 3
            }]);
        });

    });


    describe('with the given vmid number', function() {
        //first load _vms->ctrl.VMs
        var vmid = 3633301;
        beforeEach(function() {
            ctrl.loadVMList();
        });
        //spyOn(ctrl, 'setVMTeMp').and.CallThrough();

        //after loading, ctrl.VMs contains 2 vms in an array
        it('should ctrl.VMs be array', function() {
            expect(ctrl.VMs).toEqual(jasmine.any(Array));
        });
        it('should have 4 virtual machines', function() {
            expect(ctrl.VMs.length).toEqual(4);
        });

        it('should load vmTemp', function() {
            var testNet = {
                "interface": 1,
                "name": "3633301_NIC1",
                "ip": "10.223.136.203"
            };

            ctrl.setVMTemp(vmid);
            expect(ctrl.vmTemp.id).toEqual(3633301);
            expect(ctrl.vmTemp.name).toBe('ilabredis-devba');
            expect(ctrl.vmTemp.description).toBeNull();
            expect(ctrl.vmTemp.CPU.NumOfCPU).toEqual(1);
            expect(ctrl.vmTemp.memory.memory).toBe('2G');
            expect(ctrl.vmTemp.CPU.index).toEqual(0);

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
                expect(ctrl.tplConfig[0].name).toBe('1');
            });

            it('should close the expanded table if click 2 times', function() {
                ctrl.showVmEdit(vmid, true);
                expect(ctrl.showPage).toEqual(0);
            });

			it('should close the expanded table and revert the data to the original', function() {
				ctrl.configTmp.name = 'change1';
				ctrl.configTmp.description = 'change2';
				ctrl.configTmp.id = 'change3';
				ctrl.configTmp.CPU.NumOfCPU = 'change4';
				ctrl.configTmp.memory.memory = 'change5';
				ctrl.configTmp.network = [];
				ctrl.showVmEdit(vmid, false);
				expect(ctrl.showPage).toEqual(0);
				expect(ctrl.configTmp.name).toBe('ilabredis-devba');
				expect(ctrl.configTmp).toEqual(ctrl.vmTemp);				
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

			it('should increase the number of Template up to 4', function() {
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				expect(ctrl.tplConfig.length).toEqual(2);
				expect(ctrl.tplConfig[1].name).toEqual(2);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				expect(ctrl.tplConfig.length).toEqual(4);												
			});

			it('should decrease the number of Template least to 1', function() {
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, true);
				ctrl.changeTplNumber(ctrl.tplConfig, false);
				expect(ctrl.tplConfig.length).toEqual(3);
				expect(ctrl.tplConfig[2].name).toEqual(3);
				ctrl.changeTplNumber(ctrl.tplConfig, false);
				ctrl.changeTplNumber(ctrl.tplConfig, false);
				ctrl.changeTplNumber(ctrl.tplConfig, false);
				expect(ctrl.tplConfig.length).toEqual(1);
				expect(ctrl.tplConfig[0].interface).toEqual('1');
			});

			it('should update VM\' info', function() {
				ctrl.configTmp.name = 'change1';
				ctrl.configTmp.description = 'change2';
				ctrl.configTmp.id = vmid;
				ctrl.configTmp.CPU.NumOfCPU = 'change4';
				ctrl.configTmp.memory.memory = '2';				
				ctrl.updateConfig(vmid);
				expect(ctrl.VMs[0].name).toBe('change1');
				expect(ctrl.VMs[0].cpus).toBe('change4');
				expect(ctrl.VMs[0].mem).toEqual(2048);
				expect(ctrl.VMs[0].description).toBe('change2');
				expect(ctrl.showPage).toEqual(0);
			});

			it('should save VM template', function() {
				ctrl.saveTemp.name = 'a';
				ctrl.saveTemp.modeSaveDisk.diskMode = 'copy';
				ctrl.saveTemp.modeSaveDisk.saveMode = 'clone';
				ctrl.saveVMTemplate(vmid);
				expect(ctrl.saveTemp.modeSaveDisk.diskMode).toBe('copy');
				expect(ctrl.saveTemp.modeSaveDisk.saveMode).toBe('clone');
            });
        });
    });


    describe('test the delete dialog', function() {
        beforeEach(function() {
            var modalOptions = {
                templateUrl: '/n/views/consent.html',
                controller: 'W2ConsentModal as w2modal',
                resolve: {
                    employee: jasmine.any(Function)
                },
                size: 'lg'
            };

        });

        it('should open modal dialog when openDeleteDialog()', function() {
            ctrl.openDeleteDialog(400);
            expect(modalDialog.open).toHaveBeenCalledWith({
                templateUrl: 'main/templates/vmDeleteDialog.html',
                controller: 'ModalInstanceCtrl',
                animation: false,
                size:400
            });

        });

        it('should get true result in modal', function() {
            ctrl.openDeleteDialog();
            scope.delete();
            expect(modalInstance.close).toHaveBeenCalledWith(true);
        });

        it('should delete in modal', function() {
            ctrl.openDeleteDialog();
            scope.delete();
            expect(modalInstance.result.then).toEqual(true);
        });
    });
    var oneVM;
    describe('test the vm operation function', function() {
        beforeEach(function() {
            oneVMToPowerOff = ctrl.VMs[0]; //power=1
            oneVMToPowerOn = ctrl.VMs[1]; //power=0
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
                ctrl.powerOperation(oneVMToPowerOff, 'powerOff');

            });
            
            httpBackend.flush();
            expect(oneVMToPowerOff.power).toEqual(0);
            expect(oneVMToPowerOff.statusDisplay).toEqual('Stopped');
        });

        it('should power on the vm after power on', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerOn', 3633401)
            .respond(oneVMPowerOnSuccess);
            scope.$apply(function() {
                ctrl.powerOperation(oneVMToPowerOn, 'powerOn');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.power).toEqual(1);
        });
        it('should suspend the vm after suspend', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerPause', 3633401)
            .respond(oneVMSuspendSuccess);
            scope.$apply(function() {
                ctrl.powerOperation(oneVMToPowerOn, 'suspend');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.power).toEqual(2);
        });
        it('should power on the vm after restart', function() {
            httpBackend.expectPOST('/services/api/virtual-machines/3633401/powerReset', 3633401)
            .respond(oneVMPowerOnSuccess);
            scope.$apply(function() {
                ctrl.powerOperation(oneVMToPowerOn, 'restart');
            });
            httpBackend.flush();
            expect(oneVMToPowerOn.power).toEqual(1);
        });


    });
});
