describe('Environment lists controller', function() {	
	var scope, ctrl;

	beforeEach(module('ilab'));	
	beforeEach(inject(function($rootScope, $controller) {		
	 	scope = $rootScope.$new();		
	 	ctrl = $controller('EnvlistCtrl', {'$scope': scope});	
	 }));


    it('should have an environment lists controller', function() {
    expect(ctrl.check(ctrl.lists)).toBe(true);
  });

});