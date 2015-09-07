/**
 * Created by luyongjx on 7/23/2015.
 */
describe('info-card directive', function() {
    var compile, scope, element, document;
    // Load the ilab module, which contains the card directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));
    
    // Store references to $rootScope and $compile
    beforeEach(inject(function($rootScope, $compile, $document) {

        document = $document;
        scope = $rootScope.$new();

         scope.vmFakeData = {
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
        element = '<info-card info="scope.vmFakeData"></info-card>';     
         

        element = $compile(element)(scope);
        scope.$digest();
        console.log(1); 
    }));
   
    describe('with different virtual machines', function(){
        it('should have different status on panels',function(){
            expect(element.html()).toContain('class="card"');
        });
        it('should have right cout of virtual machines', function(){
            expect(element.find('info-card').length).toBe(2);
        });
        it('should hide carousel when machine count is less than 12', function(){
            expect(element.find('card-container').hasCLass('ng-show')).toBe(true);
        });
    });


    
    // describe('when clicked 1 virtual machine card', function(){
    //     it('should open when I first toggle', function() {
    //         var isolated = element.isolateScope();
    //         isolated.toggleFilter();
    //         expect(isolated.isShown).toBe(true);
    //     });
    //     it('should close when I toggle twice', function () {
    //         var isolated = element.isolateScope();
    //         isolated.toggleFilter();
    //         isolated.toggleFilter();
    //         expect(isolated.isShown).toBe(false);
    //     });
    //     it('should close when I click outside', function() {
    //         var isolated = element.isolateScope();
    //         isolated.toggleFilter();
    //         document.trigger('click');
    //         expect(isolated.isShown).toBe(false);
    //     });
    // });

    // it('should return true if vm is in Running', function() {
    //         var result = ctrl.isRunning(3633301);
    //         expect(result).toEqual(true);
    // });

});