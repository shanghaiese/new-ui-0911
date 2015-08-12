/**
 * Created by luyongjx on 7/23/2015.
 */
/*describe('info-card directive', function() {
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
            id: 'test 1',
            status:'Stopped',
            name:'Test Machine 1',
            description:'This a test VM',
            config:'2CPU,4G',
            ip:'10.239.00.01',
            network:'Subnet1'
        },{
            id: 'test 2',
            status:'Running',
            name:'Test Machine 2',
            description:'This a test VM',
            config:'2CPU,4G',
            ip:'10.239.00.01',
            network:'Subnet1'
        }];

    });

    it('should compile directive to html', function() {
        var scope = $rootScope.$new();
        var ele = $compile('<info-card class="list-VMs" type="vm" info="vm" on-connect="envBasic.connect(id)" on-power="envBasic.powerOperation(id,op)"  ng-repeat="vm in envBasic.vms" ></info-card>')(scope);
        scope.$digest();
        expect(ele.html()).toContain('<div></div>');

    });

    // it('should have functions and data sope correctly', function(){
    //      var scope = rootScope.$new();
        
    // });

    // it('should have 3 fifferent color classes changing dut to the status',function(){
    //     var scope = $rootScope.$new();
        
    // });

});*/