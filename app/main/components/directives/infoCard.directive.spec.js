/**
 * Created by luyongjx on 7/23/2015.
 */
describe('info-card directive', function() {
    var compile, scope, rootScope, element, document;

    // Load the ilab module, which contains the card directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));
    
    // Store references to $rootScope and $compile
    beforeEach(inject(function($compile, $rootScope, $document) {
        document = $document;
        compile = $compile; 
        scope = $rootScope.$new();
        element = '<info-card info="myMockData"></info-card>';

        //create myMockData to test card directive
        scope.myMockData = [{
                    "id": "test1",
                    "path": "/vmfs/volumes/.../vm1.vmx",
                    "name": '1ilabclient01_win2008R2_with_agent',
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
                        "ip": "169.254.186.241"
                    }],
                    "vmm": "10.223.136.232",
                    "disk1": "TBD"
                }, {
                    "id": "test2",
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
                }];
        element = $compile(element)(scope);
        scope.$digest();
    }));

    
    
    describe('with different virtual machines', function(){
        it('should have different status on panels',function(){
            expect(element.html()).toContain('class="card"');
        });
        // it('should have right cout of virtual machines', function(){
        //     expect(element).toEqual('16');
        // })
    });


    
    describe('when clicked', function(){
        it('should open when I first toggle', function() {
            var isolated = element.isolateScope();
            isolated.toggle();
            expect(isolated.isShown).toBe(true);
        });
        it('should close when I toggle twice', function () {
            var isolated = element.isolateScope();
            isolated.toggle();
            isolated.toggle();
            expect(isolated.isShown).toBe(false);
        });
        it('should close when I click outside', function() {
            var isolated = element.isolateScope();
            isolated.toggle();
            document.trigger('click');
            expect(isolated.isShown).toBe(false);
        });
    });

    it('should return true if vm is in Running', function() {
            var result = ctrl.isRunning(3633301);
            expect(result).toEqual(true);
    });

});