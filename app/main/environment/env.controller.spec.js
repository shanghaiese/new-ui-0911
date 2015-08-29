describe('EnvCtrl', function() {
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
    }];

	var scope, ctrl, $rootScope;

    beforeEach(module('ilab'));
    

	beforeEach(inject(function($rootScope, $controller, _$httpBackend_ , Restangular) {
		scope = $rootScope.$new();
		httpBackend = _$httpBackend_;
        restangular = Restangular;
		ctrl = $controller('EnvCtrl', {'$scope': scope,  _env : envFakeData}); 
        
	}));

	it('should have a editEnvCtrl controller', function() {
		expect(ctrl).not.toEqual(null);
	});

    describe('test edit env function',function(){

        var api = '/services/api/environments/2069501';
        var createdEnv = {'name':'',
                          'expire_date': ''
                            };
       
        it('should edit a new env info by calling editEnv', function() {
            expect(ctrl.editEnv).not.toEqual(null);
        });

        it('should cancel editing env by function cancelAdd', function() {
        expect(ctrl.cancelEdit).not.toEqual(null);
        expect(ctrl.editedEnv).toEqual(createdEnv);

    });

    });
});
