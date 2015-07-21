describe('vms controller', function() {
	var scope, ctrl;

	beforeEach(module('ilab'))
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('VMsCtrl', {'$scope': scope});
	}));

	it('should ', function() {
		expect(ctrl.check(ctrl.item)).toBe(true);

	});
	it('should do', function() {
		expect(1).toBe(1);
	})
	it('should bind to ctrl', function() {
		expect(ctrl.item).toBe(1)
	})

})