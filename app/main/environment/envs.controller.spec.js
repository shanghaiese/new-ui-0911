describe('EnvsCtrl', function() {
        var envFakeData = [{
        "id": 2069501,
        "name": "defect test",
        "groupId": 1123301,
        "deployedDate": "Jan  1 1900 05:05:17:497PM",
        "expiryDate": "Sep 20 2015 12:00:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Gopalakrishnan, Rengarajan",
        "maxAllowedVms": 3360 ,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    },
    {
        "id": 2088301,
        "name": "Environment Name",
        "groupId": 1123301,
        "deployedDate": "Aug 25 2015 01:29:22:910AM",
        "expiryDate": "Aug 19 2015 06:04:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Wang, Yufan",
        "maxAllowedVms": 3360 ,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    },
    {
        "id": 2088401,
        "name": "Environment Name",
        "groupId": 1123301,
        "deployedDate": "Aug 25 2015 01:29:38:830AM",
        "expiryDate": "Aug 19 2015 06:04:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Wang, Yufan",
        "maxAllowedVms": 3360 ,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    },
    {
        "id": 2088501,
        "name": "Environment Name",
        "groupId": 1123301,
        "deployedDate": "Aug 25 2015 01:30:47:977AM",
        "expiryDate": "Aug 19 2015 06:04:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Wang, Yufan",
        "maxAllowedVms": 3360,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    },
    {
        "id": 2088601,
        "name": "Environment Name",
        "groupId": 1123301,
        "deployedDate": "Aug 25 2015 01:31:20:233AM",
        "expiryDate": "Aug 19 2015 06:04:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Wang, Yufan",
        "maxAllowedVms": 3360 ,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    },
    {
        "id": 2088701,
        "name": "Environment Name",
        "groupId": 1123301,
        "deployedDate": "Aug 25 2015 01:38:30:830AM",
        "expiryDate": "Aug 19 2015 06:04:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Wang, Yufan",
        "maxAllowedVms": 3360,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    },
    {
        "id": 2088801,
        "name": "Environment Name",
        "groupId": 1123301,
        "deployedDate": "Aug 25 2015 01:45:44:887AM",
        "expiryDate": "Aug 19 2015 06:04:00:000AM",
        "expiryNotificationDate": null,
        "owner": "Wang, Yufan",
        "maxAllowedVms": 3360,
        "summary": [{
                "virtualMachines": 1,
                "physicalMachines":2,
                "networks":2,
                "users":1
            }]
    }];

	var scope, ctrl, $rootScope;

    beforeEach(module('ilab'));
    

	beforeEach(inject(function($rootScope, $controller, _$httpBackend_ , Restangular) {
		scope = $rootScope.$new();
		httpBackend = _$httpBackend_;
        restangular = Restangular;
		ctrl = $controller('EnvsCtrl', {'$scope': scope,  _envs : envFakeData}); 
        
	}));
    
	it('should have a EnvsCtrl controller', function() {
		expect(ctrl).not.toEqual(null);
	});

    it('should have variable is isCollapsed', function() {
        expect(ctrl.isCollapsed).toEqual(1);
    });

     it('should fetch list of envs', function() {
        expect(ctrl._envs).not.toEqual(null);
    });
    
    describe('test add env function',function(){
        var api = '/services/api/environments';
        var newEnv = {
                       'name':'',
                       'expire_date': '2015-10-20 06:04:00'
                       };
        var returndata = {
                            "id": 11801,
                            "name": "Environment Name",
                            "groupId": 10701,
                            "deployedDate": "Aug 18 2015 04:45:39:160AM",
                            "expiryDate": "Aug 31 2015 06:04:00:000AM",
                            "expiryNotificationDate": null,
                            "owner": "Chen, Yongyu",
                            "maxAllowedVms": 10
                            };

        xit('should add a new env info by calling addEnv', function() {
            ctrl.addEnv();
            expect(ctrl.newEnv).toEqual(newEnv);
            expect(ctrl.createdEnv).toEqual(returndata);
    });

        it('should cancel adding env by function cancelAdd', function() {
        expect(scope.cancelAdd).not.toEqual(null);
        scope.newEnv = {'name':'newEnv1',
                       'expire_date': '2015-10-20 06:04:00'
                       };

    });

    });
});
 


