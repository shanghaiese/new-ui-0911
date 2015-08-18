/**
 * Created by luyongjx on 7/23/2015.
 */
describe('info-card directive', function() {
    var $compile, $rootScope;

    // Load the ilab module, which contains the card directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));
    
    // Store references to $rootScope and $compile
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    
    

    it('should have funcitons and data on scope correctly',function(){
        var scope = $rootScope.$new();
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

    });

    it('should compile directive to html', function() {
        var scope = $rootScope.$new();
        var ele = $compile('<info-card></info-card>')(scope);
        scope.$digest();
        expect(ele.html()).toContain('<div class="card">');

    });

    // it('should have test scope data correctly', function(){
    //      var compileElementscope = element.isolateScope();
    //      expect(compiledelementScope.stockData).toEqual(scope.myMockData);
    //      //expect(compiledelementscope.getchange(compiledElementScope.stockData)).toEqual(-50);
        
    // });

    // it('should have 3 fifferent color classes changing due to the status',function(){
    //     var scope = $rootScope.$new();
        
    // });

});