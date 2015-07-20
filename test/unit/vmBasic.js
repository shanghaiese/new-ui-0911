/**
 * Created by luyongjx on 7/17/2015.
 */
describe("VMBasicCtrl",function(){
    beforeEach(function(){
        it('should have a properly working vmBasicCtrl controller',inject(function($controller,$rootScope) {
            //create scope for us to bind using
            $scope = $rootScope.$new();

            var mockData = {
                statusDisplay: 'Running',
                vmName: 'Virtual Machine 1',
                vmDescription: 'This a test VM',
                vmConfig: '2CPU,4G',
                vmIP: '10.239.00.01',
                vmNetwork: 'Subnet1'
            }

        }));
    });
});

