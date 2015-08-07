/**
 * Created by luyongjx on 7/23/2015.
 */
/*describe('ilab info-card Directive', function() {
    var scope, rootscope, compile;

    // Load the ilab module, which contains the card directive
    beforeEach(module('ilab'));
    beforeEach(module('templates'));
    
    // Store references to $rootScope and $compile
    beforeEach(inject(function ($scope,$rootScope,$compile) {
        scope = $scope;
        rootScope = $rootScope;
        compile = $compile;
    }));

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

    it('should compile directive to html', function() {
        var scope = $rootScope.$new();
        var ele = $compile('<info-card></info-card>')(scope);
        scope.$digest();
        expect(ele.html()).toContain('<section class="ilab-menu intel-accordion">');

    });



    it('should have functions and data sope correctly', function(){
            var scope = rootScope.$new();
        
    });

});*/