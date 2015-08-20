describe('vms controller', function() {
	var scope, ctrl;

	beforeEach(module('ilab'));
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		ctrl = $controller('VMCtrl', {'$scope': scope});
	}));

	it('should have a VMCtrl controller', function() {
		expect(ctrl).not.toEqual(null);

	});

	it('should select all checkbox by toggleCheckAll function', function() {
		ctrl.selectedVMs = [];
		var toggle = ctrl.toggleCheckAll();
		expect(ctrl.selectedVMs.length).toEqual(ctrl.VMs.length);
	});

});