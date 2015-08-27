(function() {

    angular
    	.module('ilabService')
        .factory('vmService', vmService);

    vmService.$inject = ['Restangular', 'vmModel'];
    function vmService(Restangular, vmModel) {
        var virtualMachines = Restangular.all('virtual-machines');
    	Restangular.extendModel('virtual-machines', function(vms) {
    		var api = {
                getOne: function() {
                    return virtualMachines.get(this.id);
                }

            };
            return vmModel.mixInto(vms);
    	});
    	return Restangular.all('admin/virtual-machines');
    }


})();
 