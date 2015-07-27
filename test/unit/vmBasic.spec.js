/**
 * Created by luyongjx on 7/17/2015.
 */
describe("VMBasic Controller",function() {
    beforEach(module('ilab'));

    var scope, ctrl;

    beforeEach(inject(function () {
        ctrl = $controller('vmBaiscCtrl');
    }));

    it('should get bind data',function(){
        expect(ctrl.items).toEqual([
            {
                machineType:'VM',
                statusDisplay:'Suspend',
                vmName:'Virtual Machine 3',
                vmDescription:'This a test VM',
                vmConfig:'2CPU,4G',
                vmIP:'10.239.00.03',
                vmNetwork:'Subnet3'
            }, {
                machineType:'PM',
                statusDisplay:'Stopped',
                vmName:'Virtual Machine 5',
                vmDescription:'This a test VM',
                vmConfig:'2CPU,4G',
                vmIP:'10.239.00.05',
                vmNetwork:'Subnet5'
            }
        ]);
    });
    it('should work', function(){
        expect(ctrl,check(ctrl,item)).toBe(true);
    });
});
